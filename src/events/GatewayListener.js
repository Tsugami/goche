const GocheLibrary = require('../GocheLibrary');
const GocheListener = require('./listeners/GocheListener');

/**
 * This is not a Discord API event. It's totally from the library!
 * Remembering you cannot manage anything using this event.
 */
module.exports = class GatewayListener extends GocheListener {
    constructor(data, shardID) {
        super()
        this.eventName = 'GATEWAY_LISTENER'
        this.gocheLibrary = new GocheLibrary()
        this.shardID = shardID
    }
    /**
     * 
     * @param {*} OPIdentify 
     */
    on(data) {  }
}