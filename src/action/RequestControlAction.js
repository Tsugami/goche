module.exports = class RequestControlAction {
	constructor() {
		this.queue = 5;
		this.limitQueue = false;
		this.ignoreRequest = false;
		this.ignorePath = [];
	}


	/**
	 * 
	 * @param {*} time 
	 */
	setTime(time) {

	}

	/**
	 *
	 * @param {*} number
	 * @returns
	 * This method will limit the number of requests.
	 */
	setQueueSize(number) {
		if (typeof number === 'number') {
			this.queue = number;
			this.limitQueue = true;
			
			return this;
		}
		this.queue = 5; // Default
		return this;
	}

	/**
	 *
	 * @returns This method will give up requests when exceeding the requested limit.
	 */
	setIgnoreRequest() {
		this.ignoreRequest = true;
		return this;
	}
};
