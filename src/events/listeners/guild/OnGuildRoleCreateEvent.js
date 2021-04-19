const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');


module.exports = class OnGuildRoleCreateEvent extends GocheListener {
    constructor(data) {
        super()
        this.eventName = 'GUILD_ROLE_CREATE'
        this.gocheLibrary = new GocheLibrary()
    }

    on(data) {  }
}   