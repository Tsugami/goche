const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');


module.exports = class OnGuildRemove extends GocheListener {
    constructor(data) {
        super()
        this.eventName = 'GUILD_REMOVE'
        this.gocheLibrary = new GocheLibrary()
    }

    on(data) {  }
}   