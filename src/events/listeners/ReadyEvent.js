const GocheLibrary = require('../../GocheLibrary');
const GocheListener = require('./GocheListener');



module.exports = class ReadyEvent extends GocheListener {
    constructor(data) {
        super()
        this.eventName = 'READY'
        this.gocheLibrary = new GocheLibrary()
    }

    on(data) {  }
}