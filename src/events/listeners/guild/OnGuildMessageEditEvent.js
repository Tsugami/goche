const Message = require('../../../entities/Message');
const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class OnGuildMessageEditEvent extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'MESSAGE_UPDATE';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
