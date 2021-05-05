const WebsocketManager = require('../requests/WebsocketManager')
const GocheInfo = require('../GocheInfo')
const WebSocket = require('ws')

module.exports = class ConnectionManager {
    constructor(websocketManager = new WebsocketManager(), shardID) {
        this.ws = null
        this.websocketManager = websocketManager
        this.shardID = shardID
        this.uptime = 0
        this.ping = 0
        this.seq = 0
        this.data = {
            /**
             * That is objects of verification guild.
             */
            guilds: []
        }
        this.heart = null
        this.lantecy = 0
        this.ready = false
    }

    connecting() {
        this.websocketManager.connectionList.delete(this.shardID)
        this.websocketManager.connectionList.set(this.shardID, new ConnectionManager(this.websocketManager, this.shards))
    }
    
    ok(type, intents, id) {
        this.ws.on('open', (ws) => this.identify(type, intents))
        this.ws.on('error', (err) => {
            this.connecting()
        })
        this.ws.on('close', (ws, code, reason) => {
            this.ready = false
        })
    
        this.ws.on('message', async (message) => {
        
            let data = JSON.parse(message)
            data.shard = this.shardID
            this.websocketManager.gocheClient.heartbeart.wsReceivedMessage++
            if (typeof data.s === 'number') {
                this.seq++
            }
            switch(data.op) {
                case 11:
                    this.websocketManager.gocheClient.ping = Date.now() - this.lantecy
                break;
                case 10: 
                    const sendHeart = async() => {
                        this.lantecy = Date.now()
            
                        await this.send({
                            'op': 1,
                            'd': this.seq
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
                    this.websocketManager.gocheClient.goche.gocheController.updateCache(data, this.shardID)
                delete data.d
                delete data.op
            }
        })
    return this;

    }
    connect(type) {
        this.ws = new WebSocket(`wss://gateway.discord.gg/?v=${GocheInfo.DISCORD_REST}&encoding=json`)
        this.ok(type, this.websocketManager.gocheClient.intentManager.intents === 0 ? false : true)
    }

    sendListener(data) {
        this.websocketManager.gocheClient.goche.listenerManager.listeners
            .filter((eventClass) => eventClass.eventName === 'GATEWAY_LISTENER')
            .map((eventClass) => eventClass.on(new OPIdentify(data, false)))
    }
    send(data) {
        this.websocketManager.gocheClient.goche.listenerManager.listeners
        .filter((eventClass) => eventClass.eventName === 'GATEWAY_LISTENER')
        .map((eventClass) => eventClass.on(new OPIdentify(data, true)))
        data.shard = this.shardID
        this.ws.send(JSON.stringify(data))
        return data
    }

    revokedToken(type, intents) {
        this.identify(type, intents)
    }

    setActivities(activities) {
        this.send({
            op: 3,
            d: {
                game:  this.websocketManager.gocheClient.goche.activities.presenceWS(),
                status: this.websocketManager.gocheClient.goche.activities.status,
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
                        token: this.websocketManager.gocheClient.token,
                        session_id: this.websocketManager.gocheClient.selfUser.sessionID,
                        seq: this.seq
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
    resuming(message, type, intents) {
        if (message.d === false) {
            /**
             * When you turn it on and off, turn it on again as Discord asks you to return to the previous session that was created. 
             * So this function will restore the previous session but it will not recover lost events either.
             */
            this.identify(type, intents)
        }
        return this
    }




    async identify(type, intents) {
        this.ready = true
        this.websocketManager.gocheClient.goche.activities.setListening(`Sharding on ${this.shardID}`)
      
        const data = {
            op: 2,
            d: {
                token: this.websocketManager.gocheClient.token,
                v: GocheInfo.DISCORD_REST,
                guild_subscriptions: true,
                shards: [this.shardID, this.websocketManager.gocheClient.shard],
                presence: {
                    game:  this.websocketManager.gocheClient.goche.activities.presenceWS(),
                    status: this.websocketManager.gocheClient.goche.activities.status,
            
                    afk: false
                },
        
                properties: {
                    os:  process.platform,
                    browser: 'Goche - https://github.com/NavyCake/Goche',
                    device: 'Goche - https://github.com/NavyCake/Goche'
                }
            }
        }

        if (intents === true) {
            data.d.intents = this.websocketManager.gocheClient.intentManager.intents
        }

        await this.send(data)

        await this.send({
            op: 1,
            d: this.seq
        })
    }


}