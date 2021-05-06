


module.exports = class RateLimit {
    constructor() {
        this.channel = new Map()
        this.otherRequest = []
    }


    addQueue(objectFunction) {
        return this.otherRequest.push(objectFunction)
    }


    deleteQueue() {
        return this.otherRequest.pop()
    }


    addQueueChannel(id, objectFunction) {
        return this.addQueueChannel()
    }

    deleteQueueChannel(id) {
        return this.channel.delete(id)
    }


}