const GocheLibrary = require('../../GocheLibrary');

module.exports = class GocheListener {
	/**
	 * @description This class only works with listeners and is extended into a sub class
	 * @param {*} client
	 */
	constructor(client) {
		this.eventName = '';
		this.gocheLibrary = client;
		this.op = 2;
	}
	/**
	 *
	 * @this on This method will receive events that are received by Discord.
	 */
	on(...args) {}
};
