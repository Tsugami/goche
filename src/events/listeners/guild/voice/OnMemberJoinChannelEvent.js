const GocheLibrary = require('../../../../GocheLibrary');
const GocheListener = require('../../GocheListener');



module.exports = class OnMemberJoinChannel extends GocheListener {
    constructor(data) {
        super()
        this.eventName = 'VOICE_STATE_JOIN'
        this.gocheLibrary = new GocheLibrary()
    }

    on(data) {  }
}