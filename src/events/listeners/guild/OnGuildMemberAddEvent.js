const Message = require('../../../entities/Message');
const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class OnGuildMemberAddEvent extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'GUILD_MEMBER_ADD';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
