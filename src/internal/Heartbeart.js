module.exports = class Heartbeart {
    constructor(gocheClient) {
        this.gocheClient = gocheClient
        this.uptime = 0
        this.seq = 0
        this.ping - 0
        this.attempts = 0
        this.requests = 0
        this.wsSendMesssages = 0
        this.wsReceivedMessage = 0
        this.cache = 0
        this.mapSaved = 0
        this.updateObjects = 0
        this.rateLimit = 0
    }
}