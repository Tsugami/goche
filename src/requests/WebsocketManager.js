const WebSocket = require('ws')
const ConnectionManager = require('../api/ConnectionManager')
const GocheInfo = require('../GocheInfo')
const GocheClient = require('../manager/GocheClient')




module.exports = class WebsocketManager {

    constructor(client = new GocheClient()) {
        this.gocheClient = client
        /**
         * You can manage the Websocket Connection that you will get within the class
         */
        this.connectionList = new Map()
        
    }
    


    connect(type) {
        let nb = 0
        const arrayShards = Array.from({length: this.gocheClient.shard}, (data) => nb++)
        
        this.ok()
        for (let shard of arrayShards) {
            const data = this
            const shardNb = shard

            if (shard > 20) {

                setTimeout(() => {
                    const connection = new ConnectionManager(data, shard)
                    this.connectionList.set(shard, connection)
                    connection.connect('sharding')
                }, 6 * 1000)
            } else {
                setTimeout(() => {
                    const connection = new ConnectionManager(data, shard)
                    this.connectionList.set(shard, connection)
                    connection.connect('sharding')
                }, 1 * 1000)
            }
        }

     
       
    }
    
    ok(type, intents, id) {
    
        this.wsMaster.on('close', (ws, code, reason) => {
            this.ready = false
        })
    
        this.wsMaster.on('message', async (message) => {
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
                    this.reconnect(7, data, 'It looks like there was a problem with server connection or Discord made a request to reconnect')
                    break;
                case 9:
                    this.reconnect(9, data, 'It seems that Discord gave up on this connection because the previous one there was a stabilized connection and in a few seconds I will reconnect')  
            }

        })
    return this;

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
        let nb = 0
        const arrayShards = Array.from({length: this.gocheClient.shard}, (data) => nb++)
        
        const data = {
            op: 2,
            d: {
                token: this.gocheClient.token,
                v: GocheInfo.DISCORD_REST,
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
        }

        if (intents === true) {
            data.d.intents = this.gocheClient.intentManager.intents
        }
     
        if (type === 'sharding') {
            data.d.shards = [0, this.gocheClient.shard]
        }
        
        await this.send(data)

        await this.send({
            op: 1,
            d: this.gocheClient.heartbeart.seq
        })
    }

    send(data) {
        this.wsMaster.send(JSON.stringify(data))
        return data
    }


}