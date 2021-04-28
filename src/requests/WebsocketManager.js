
const Websocket = require('ws')
const Channel = require('../entities/Channel')
const Guild = require('../entities/Guild')
const Member = require('../entities/Member')
const Message = require('../entities/Message')
const SelfUser = require('../entities/SelfUser')
const GocheClient = require('../manager/GocheClient')
const OPIdentify = require('../socket/OPIdentify')




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
               
                        await this.send({
                            'op': 1,
                            'd': this.gocheClient.heartbeart.seq
                        })
                   
                       
                    } 
                    
                    this.heart = setInterval(async function() {
                        sendHeart()
                    }, data.d.heartbeat_interval) 
                    break;
                case 7:
                    this.sendListener(data)
                    this.reconnect(7, data, 'It looks like there was a problem with server connection or Discord made a request to reconnect')
                    break;
                case 9:
                    this.sendListener(data)
                    this.reconnect(9, data, 'It seems that Discord gave up on this connection because the previous one there was a stabilized connection and in a few seconds I will reconnect')       
                default:
                    this.gocheClient.goche.gocheController.updateCache(data)
                delete data.d
                delete data.op
            }
        })
     return this;


    }

    sendListener(data) {
        this.gocheClient.goche.listenerManager.listeners
            .filter((eventClass) => eventClass.eventName === 'GATEWAY_LISTENER')
            .map((eventClass) => eventClass.on(new OPIdentify(data, false)))
    }
    send(data) {
        this.gocheClient.goche.listenerManager.listeners
        .filter((eventClass) => eventClass.eventName === 'GATEWAY_LISTENER')
        .map((eventClass) => eventClass.on(new OPIdentify(data, true)))
        this.ws.send(JSON.stringify(data))
        return data
    }

    revokedToken() {
       this.identify()
    }

    setActivities(activities) {
        this.send({
            op: 3,
            d: {
                game:  this.gocheClient.goche.activities.presenceWS(),
                status: this.gocheClient.goche.activities.status,
                afk: false
            }
        })
       
    }
    
    /**
     * 
     * This part is for reconnecting to the Websocket and resuming the session back. **This method was not created to recreate or disconnect, 
     * to create closure of the websocket.** Only to **resume** the `session`!
     */
    async reconnect(op, message, reason) {
        switch(op) {
            case 9:
                /**
                 * When you turn it on and off, turn it on again as Discord asks you to return to the previous session that was created. 
                 * So this function will restore the previous session but it will not recover lost events either.
                 */
                this.resuming(message)
            break;
            case 7:
                /**
                 * From what I understand when the bot does not receive many events, sometimes it asks to reconnect. 
                 * Otherwise, if there is a connection problem, this option may return.
                 */
                this.send({
                    op: 6,
                    d: {
                        token: this.gocheClient.token,
                        session_id: this.gocheClient.selfUser.sessionID,
                        seq: this.gocheClient.heartbeart.seq
                    }
                })
            break;
        }

        return this
    }


    /**
     * @prop { t: null, s: null, op: 9, d: true || false }
     * To resume the session
     */
    resuming(message) {
        if (message.d === false) {
            /**
             * When you turn it on and off, turn it on again as Discord asks you to return to the previous session that was created. 
             * So this function will restore the previous session but it will not recover lost events either.
             */
             this.identify()
        }
        return this
    }

 

    
     async identify() {
        this.ready = true
     
        await this.send({
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

        await this.send({
            op: 1,
            d: this.gocheClient.heartbeart.seq
        })
    }



}