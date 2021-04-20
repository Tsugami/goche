const SelfUser = require('../entities/SelfUser')
const GocheLibrary = require('../GocheLibrary')
const Heartbeart = require('../internal/Heartbeart')
const WebsocketManager = require('../requests/WebsocketManager')


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
        this.intents = 33554432
        this.wsManager = new WebsocketManager(this)
        this.selfUser = null
        
    }
}