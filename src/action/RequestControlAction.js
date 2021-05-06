
module.exports = class RequestControlAction {
    constructor() {
        this.queue = 5
        this.ignoreRequest = false
        this.ignorePath = []
        this.warn = false
    }
    /**
     * 
     * @param {*} number 
     * @returns 
     * This method will limit the number of requests.
     */
    setQueue(number) {
        if (typeof number === 'number') {
            this.queue = number
        }
        this.queue = 5 // Default
        return this
    }

    /**
     * 
     * @returns This method will give up requests when exceeding the requested limit.
     */
    setIgnoreRequest() {
        this.ignoreRequest = true
        return this
    }

 
}