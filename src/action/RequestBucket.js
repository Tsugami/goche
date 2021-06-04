const Bucket = require("./Bucket");

module.exports = class RequestBucket {
	constructor() {
		this.limit = 0
        this.bucketFull = 0
		this.queue = new Map()
	}

    /**
     * ##### Upon reaching the limit of this request they will be automatically ignored.
     * @param {*} request 
     * @returns 
     */
    addBucket(request = new Bucket()) {
        this.bucketFull++
        this.queue.set(request.path, request)
        return request;
    }


    deleteBucket(path) {
        this.bucketFull--
        this.queue.delete(path)
    }

}
