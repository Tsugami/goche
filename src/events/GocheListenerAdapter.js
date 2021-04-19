const GocheLibrary = require('../GocheLibrary')
const GocheListener = require('./listeners/GocheListener')



module.exports = class GocheListenerAdapter {
    constructor(client = new GocheLibrary()) {
        this.listeners = []
        this.client = client
        this.eventRegistered = this.listeners.length
        this.eventCount = 0
    }

    addListener(listener = new GocheListener()) {
        const listenerClass = listener
        listener.gocheLibrary = this.client
        this.listeners.push(listener)
        return this
    }
}