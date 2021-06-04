module.exports = class RequestControlAction {
	constructor() {
		this.mode = 'requestJS'
		this.queue = 5
		this.limitQueue = false
		this.ignoreRequest = false
		this.postMessage = 5
		this.postMessageSeconds = 5

		this.deleteMessage = 5
		this.deleteMessageSeconds = 1

		this.anyRequest = 300
		this.anyRequestSeconds = 300

		this.allRequest = 50
		this.allRequestSeconds = 1


		this.ignorePath = []
	}

	/**
	 *
	 * @param {*} time
	 * @deprecated 
	 */
	setTime(time) {}

	/**
	 *
	 * @param {*} number
	 * @returns
	 * This method will limit the number of requests.
	 * @deprecated
	 */
	setQueueSize(number) {
		if (typeof number === 'number') {
			this.queue = number
			this.limitQueue = true

			return this
		}
		this.queue = 5 // Default
		return this
	}

	/**
	 *
	 * @returns This method will give up requests when exceeding the requested limit.
	 * @deprecated
	 */
	setIgnoreRequest() {
		this.ignoreRequest = true
		return this
	}
}
