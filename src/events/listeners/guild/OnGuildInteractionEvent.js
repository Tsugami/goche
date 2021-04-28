const Message = require('../../../entities/Message');
const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');


module.exports = class OnGuildInteractionEvent extends GocheListener {
    constructor(data) {
        super()
        this.eventName = 'INTERACTION_CREATE'
        this.gocheLibrary = new GocheLibrary()
    }

    on(data) {  }
}   