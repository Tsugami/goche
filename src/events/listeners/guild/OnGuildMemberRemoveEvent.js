const Message = require('../../../entities/Message');
const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class OnGuildMemberRemoveEvent extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'GUILD_MEMBER_REMOVE';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
