const Guild = require('../entities/Guild')
const SelfUser = require('../entities/SelfUser')
const GocheLibrary = require('../GocheLibrary')
const Heartbeart = require('../internal/Heartbeart')
const WebsocketManager = require('../requests/WebsocketManager')
const CacheManager = require('./CacheManager')
const IgnoreCacheManager = require('./IgnoreCacheManager')
const IntentsManager = require('./IntentsManager')


module.exports = class GocheClient {
    /**
 * @GhastClient It is a basis for storing the cache and managing other things. Depending on the profile you are using, some methods may not work because certain profiles may not work if you work with the cache disabled.
 */
    constructor(profile, goche = new GocheLibrary()) {
        this.profile = profile
        this.goche = goche
        this.heartbeart = new Heartbeart(this)
        this.token =  this.goche.token
        Object.defineProperty(this, 'token', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: this.goche.token
        })
        this.guilds = new Map()
        Object.assign(this.guilds, Guild)
        
        this.intents = 0
        this.wsManager = new WebsocketManager(this)
        this.intentManager = new IntentsManager()
        this.cacheManager = new CacheManager()
        this.ignoreCacheManager = new IgnoreCacheManager()
        this.shard = 1
        this.selfUser = null
        this.uptime = 0
        
    }
}