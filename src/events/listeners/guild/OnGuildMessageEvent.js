const Message = require('../../../entities/Message');
const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class OnGuildMessageEvent extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'MESSAGE_CREATE';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
