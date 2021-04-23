
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

      
  
        this.heart = null
        this.lantecy = 0
        this.ready = false
    }

    connect() {
      
        this.ws.on('open', (ws) => this.identify())

        this.ws.on('close', (ws, code, reason) => {
            this.ready = false
        })
    
        this.ws.on('message', async (message) => {
            let data = JSON.parse(message)
      
            this.gocheClient.heartbeart.wsReceivedMessage++
            if (typeof data.s === 'number') {
                this.gocheClient.heartbeart.seq++
            }
            switch(data.op) {
                case 11:
                    this.gocheClient.ping = Date.now() - this.lantecy
                break;
                case 10:
                 
           
                    const sendHeart = async() => {
                        this.lantecy = Date.now()
               
                        await this.ws.send(JSON.stringify({
                            'op': 1,
                            'd': this.gocheClient.heartbeart.seq
                        }))
                   
                       
                    } 
                    
                    this.heart = setInterval(async function() {
                        sendHeart()
                    }, data.d.heartbeat_interval) 
                    break;
                case 7:
                    this.reconnect(7, data, 'It looks like there was a problem with server connection or Discord made a request to reconnect')
                    break;
                case 9:
                    this.reconnect(9, data, 'It seems that Discord gave up on this connection because the previous one there was a stabilized connection and in a few seconds I will reconnect')       
                default:
                    this.gocheClient.goche.gocheController.updateCache(data)
                delete data.d
                delete data.op
            }
        })
     return this;


    }

    revokedToken() {
       this.identify()
    }

    setActivities(activities) {
        this.ws.send(JSON.stringify({
            op: 3,
            d: {
                game:  this.gocheClient.goche.activities.presenceWS(),
                status: this.gocheClient.goche.activities.status,
                afk: false
            }
        }))
       
    }
    
    /**
     * @prop { t: null, s: null, op: 7, d: null }
     *These types of connections can be used when there is instability in the connection or Discord disconnects because it is not in session!
     */
    reconnect(op, message, reason) {
        switch(op) {
            case 9: 
                this.resuming(message)
            break;
            case 7:
                if (this.ready === true) {
                    clearInterval(this.heart) 
                    this.ws.close(4901)
                } else {
                    this.ws.close(1000)
                }
               
            break;
        }

        return this
    }


    /**
     * @prop { t: null, s: null, op: 9, d: true || false }
     * To resume the session
     */
    resuming(message) {
        if (message.d === true) {
            /**
             * It is possible that the connection may have dropped and the session is returning back.
             */
            this.ws.send(JSON.stringify({
                op: 6,
                d: {
                    token: this.gocheClient.token,
                    session_id: this.gocheClient.selfUser.sessionID,
                    seq: this.gocheClient.heartbeart.seq
                }
            }))
        } else {
            this.identify()
        }
        return this
    }

 

    
     async identify() {
        this.ready = true

       
        await this.ws.send(
   
            JSON.stringify({
                op: 2,
                d: {
                    token: this.gocheClient.token,
                    intents: this.gocheClient.intentManager.intents,
                    v: 8,
                    guild_subscriptions: true,
                    presence: {
                        game:  this.gocheClient.goche.activities.presenceWS(),
                        status: this.gocheClient.goche.activities.status,
                 
                        afk: false
                    },
            
                    properties: {
                        os:  process.platform,
                        browser: 'Goche - https://github.com/NavyCake/Goche',
                        device: 'Goche - https://github.com/NavyCake/Goche'
                    }
                }
            })
        )

        await this.ws.send(JSON.stringify({
            'op': 1,
            'd': this.gocheClient.heartbeart.seq
        }))
    }



}