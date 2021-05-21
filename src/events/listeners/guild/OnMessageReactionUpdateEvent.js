const Message = require('../../../entities/Message');
const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class OnMessageReactionUpdateEvent extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'MESSAGE_REACTION_UPDATE';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
