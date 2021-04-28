const GocheListener = require('./events/listeners/GocheListener')
const GocheListenerAdapter = require('./events/GocheListenerAdapter')
const GocheClient = require('./manager/GocheClient')
const httpManager = require('./requests/httpManager')
const ShardingController = require('./sharding/ShardingController')
const GocheController = require('./hooks/GocheController')
const SlashManager = require('./action/guild/SlashCommand')
const Activities = require('./action/user/Activities')



module.exports = class GocheLibrary {
    /**
     * @param {*} token This token is used to connect **Websocket** and **create requests**. 
     */
    constructor(token = '') {
        this.mode = 'default'

        this.token = token
        Object.defineProperty(this, 'token', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: token
        })
        this.httpManager = new httpManager(this)
        this.client = new GocheClient(this.mode, this)
        this.shardController = new ShardingController(this)
        this.listenerManager = new GocheListenerAdapter(this)
        this.requestManager = new httpManager(this)
        this.gocheController = new GocheController(this)
        this.slashManager = new SlashManager(this)
        this.activities = new Activities()
                                .setStatus('online')

    }

    /**
     *  @GocheLibrary This method is used to retrieve events and metadata on the fly. They are not stored in a cache.
     * 
     *  @GhocheWarn Includes that you should not be able to search for the methods that are saved in the library's sub cache.
     */
    light() {
        this.mode = 'light'
        return this;
    }

    /**
     *  @GocheLibrary This profile will release and store the metadata in a cache that is picked up by the `listeners`. 
     * You can add it via the `addListener` method.
     * 
     * 
     * ```
     * const goche = new GocheLibrary()
     *                  .addListener(new Ready())
     * ```
     */
    createProfile() {
        this.mode = 'profile'
        this.client.wsManager.connect()
        
        return this;
    }


    /**
     * @param {*} intents 
     * @returns GocheLibrary
     * @description If you are placing an invalid intent, it will not be counted and will also not return any errors. The chances of connecting are small.
     * @example
     * ```
     *  const goche = new GocheLibrary()
     *                  .setIntents(
     *                          [
     *                             'guild',
     *                             'guildMembers'
     *                          ]
     *                  )
     * ```
     * @Intents
     * ```
     *  directMessageReaction: 8192
        directMessageTyping: 16384
        directMessages: 4096
        guildBan: 4
        guildEmoji: 8
        guildIntegrations: 16
        guildInvites: 64
        guildMembers: 2
        guildMessage: 512
        guildMessageReaction: 1024
        guildMessageTyping: 2048
        guildPresence: 256
        guildVoiceState: 128
        guildWebhook: 32
        guilds: 1
     * ```
     */
    setIntents(intents = ['']) { 
        if (typeof intents === 'object') {
            for (let intent of intents) {
                this.client.intentManager.add(intent)
            }
        }
        return this
    }

    /**
     * @param {*} caches 
     * @returns GocheLibrary
     * @description You can `limit` Goche to some events that are `received` by the `Websocket`. 
     * Remembering some methods may not work because certain events may `NOT WORK`.
     * @example
     *  ```
     * const goche = new GocheLibrary()
     *                  .ignoreCache(['ready', 'updateGuild'])
     * ```
     */
     ignoreCache(caches = []) {
        if (typeof caches === 'object') {
      
        }
        return this
    }
    

    /**
     * 
     * @param {*} activities Recommended to use the Activities class
     * @description This method only works with the Activities class that provides options for you to work. 
     * Also if you insert anything the method can ignore it and the results cannot go as you think.
     * @example
     * ```
     *  const goche = new setActivities()
     *                  .setIntents(
     *                          new Activities()
     *                                  .setListening('Hello World')
     *                                  .setStatus('online')
     *                  )
     * ```
     */
    setActivities(activities) {
        if (typeof activities === 'object') {
            if (activities instanceof Activities) {
               this.activities = activities
               if (this.client.wsManager.ready === true) {
                   this.client.wsManager.setActivities()
               }
            }
        }
    }

    
}
