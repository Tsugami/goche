const Message = require('../../../entities/Message');
const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class OnMessageReactionAddEvent extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'MESSAGE_REACTION_ADD';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
