const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class OnChannelCreateEvent extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'CHANNEL_CREATE';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
