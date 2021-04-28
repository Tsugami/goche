const GocheLibrary = require('../../../../GocheLibrary');
const GocheListener = require('../../GocheListener');


module.exports = class OnMemberLeaveChannelEvent extends GocheListener {
    constructor(data) {
        super()
        this.eventName = 'VOICE_STATE_LEAVE'
        this.gocheLibrary = new GocheLibrary()
    }

    on(data) {  }
}