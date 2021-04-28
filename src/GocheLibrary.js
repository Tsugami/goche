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
     * @param {*} token This token is used to connect Websocket and create requests. 
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
     *  @GocheLibrary This profile will release and store the metadata in a cache that is picked up by the listeners. You can add it via the addListener method.
     */
    createProfile() {
        this.mode = 'profile'
        this.client.wsManager.connect()
        
        return this;
    }


    /**
     * @param {*} intents 
     * @returns GocheLibrary
     */
    setIntents(intents = []) {
        if (typeof intents === 'object') {
         
         
        }
        return this
    }

    /**
     * @param {*} caches 
     * @returns GocheLibrary
     */
     ignoreCache(caches = []) {
        if (typeof caches === 'object') {
      
        }
        return this
    }

    
}
