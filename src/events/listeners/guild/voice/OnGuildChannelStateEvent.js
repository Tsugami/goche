const GocheLibrary = require('../../../../GocheLibrary');
const GocheListener = require('../../GocheListener');

module.exports = class OnGuildChannelStateEvent extends GocheLibrary {
	constructor(data) {
		super();
		this.eventName = 'VOICE_STATE_UPDATE';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
