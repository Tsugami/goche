

/**
 * This class is data that will be loaded for the GatewayListener event.
 */
module.exports = class OPIdentify {
    constructor(data, send) {
      
        this.eventName = data.t === null ? typeof send === 'undefined' ? 'LISTENER_SEND' : 'LISTENER' : typeof data.t === 'undefined' ? 'NO_LISTENER' : data.t
        this.send = typeof send === 'undefined' ? false : send
        this.sequence = typeof data.seq === 'undefined' ? 0 : data.seq
        this.op = typeof data.op === 'undefined' ? 'unknown' : data.op
        this.date = new Date()
        this.data = typeof data.d === 'undefined' ? {} : data.d
     
    }
}