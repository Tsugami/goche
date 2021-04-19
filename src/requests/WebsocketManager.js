
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
                        intents: 513 + 4096 + 16384 + 128 + 1024,
                        shards: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
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
                default:
                    this.gocheClient.goche.gocheController.updateCache(data)
                delete data.d
                delete data.op
            }
        })
     return this;
    }
}