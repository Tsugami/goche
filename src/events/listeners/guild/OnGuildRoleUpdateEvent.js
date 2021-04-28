const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');


module.exports = class OnGuildRoleUpdateEvent extends GocheListener {
    constructor(data) {
        super()
        this.eventName = 'GUILD_ROLE_UPDATE'
        this.gocheLibrary = new GocheLibrary()
    }

    on(data) {  }
}   