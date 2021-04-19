const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');


module.exports = class OnGuildRoleDeleteEvent extends GocheListener {
    constructor(data) {
        super()
        this.eventName = 'GUILD_ROLE_DELETE'
        this.gocheLibrary = new GocheLibrary()
    }

    on(data) {  }
}   