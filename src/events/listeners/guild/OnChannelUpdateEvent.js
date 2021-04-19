const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class OnChannelUpdateEvent extends GocheListener {
    constructor(data) {
        super()
        this.eventName = 'CHANNEL_UPDATE'
        this.gocheLibrary = new GocheLibrary()
    }

    on(data) {  }
}