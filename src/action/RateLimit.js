const RequestControlAction = require("./RequestControlAction")



module.exports = class RateLimit {
    constructor(requestConfig = new RequestControlAction()) 
    {
        this.channel = new Map()
        this.requestConfig = requestConfig
        this.otherRequest = []
        this.seconds = 1
        this.limit = this.requestConfig.queue
        this.requestSend = 0
        this.recovery = false
        this.setTime = null
    }

    recoveryOfRequest() {
        if (this.recovery  === false) {
            this.setTime = setTimeout(async () => {

            }, this.seconds * 1000)
            this.recovery = true
            this.otherRequest.map(e => {
                this.requestSend++
                if (this.requestSend >= this.limit) {
                    this.seconds += 5
                    /**
                     * If the number of requests is greater, we have to reset the time and start all over again. 
                     * Before starting requests.
                     */
                    try {
                        e.run()  // start request
                    } catch(requestError) {
                        /**
                         * Well, most of the time axios can end up breaking the code and end the bot process at random.
                         */
                    }
                    this.otherRequest.pop()
                    this.requestSend = 0
                    if (this.setTime === null) {
                        this.setTime   = null
                    } else {
                        clearTimeout(this.setTime)
                    }
                    this.recovery = false
                    this.setTime = null
                    this.recoveryOfRequest()
                } else {
                    this.otherRequest.pop() // remove that
                    try {
                        e.run()  // start request
                    } catch(requestError) {
                        /**
                         * Well, most of the time axios can end up breaking the code and end the bot process at random.
                         */
                        
                    }
                }
            })
        }
        
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