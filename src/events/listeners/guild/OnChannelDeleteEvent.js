const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');


module.exports = class OnChannelDeleteEvent extends GocheListener {
    constructor(data) {
        super()
        this.eventName = 'CHANNEL_DELETE'
        this.gocheLibrary = new GocheLibrary()
    }

    on(data) {  }
}