
const Websocket = require('ws')
const Channel = require('../entities/Channel')
const Guild = require('../entities/Guild')
const Member = require('../entities/Member')
const Message = require('../entities/Message')
const SelfUser = require('../entities/SelfUser')
const GocheClient = require('../manager/GocheClient')




module.exports = class WebsocketManager {

    constructor(client = new GocheClient()) {
        this.gocheClient = client
        this.ws = new Websocket("wss://gateway.discord.gg/?v=8&encoding=json")
        this.data = {
            guilds: []
        }
  
        this.ready = false
    }

    connect() {
        
        this.ws.on('open', async (data) => {
          
            this.ready = true
            await this.ws.send(JSON.stringify({
                op: 1,
                d: 251
            }))
            await this.ws.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        token: this.gocheClient.token,
                        intents: this.gocheClient.intentManager.intents,
                        shards: [0, 1],
                        properties: {
                            '$os': 'linux',
                            '$browser': 'Goche - https://github.com/NavyCake/Goche',
                            '$device': 'Goche - https://github.com/NavyCake/Goche'
                        }
                    }
                })
            )
        })
        this.ws.on('close', (data) => {
            this.ready = false
         })
    
        this.ws.on('message', async (message) => {
            let data = JSON.parse(message)
            
            
            this.gocheClient.heartbeart.wsReceivedMessage++
            if (typeof data.s === 'number') {
                this.gocheClient.heartbeart.seq++
            }
            switch(data.op) {
                case 10:
                    const sendHeart = async() => {
                        await this.ws.send(JSON.stringify({
                            'op': 1,
                            'd': 251
                        }))
                    }
                    setInterval(async function() {
                        sendHeart()
                    }, data.d.heartbeat_interval) 
                    break;
                case 7:
                    this.reconnect()
                    break;
                default:
                    this.gocheClient.goche.gocheController.updateCache(data)
                delete data.d
                delete data.op
            }
        })
     return this;


    }


    /**
     * @prop { t: null, s: null, op: 7, d: null }
     *These types of connections can be used when there is instability in the connection or Discord disconnects because it is not in session!
     */
    reconnect() {
        this.ws.send(JSON.stringify({
            op: 6,
            d: {
                token: this.gocheClient.goche.token,
                session_id: this.gocheClient.selfUser.sessionID,
                seq: this.gocheClient.heartbeart.seq
            }
        }))
    }



}