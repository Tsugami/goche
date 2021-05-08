const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class OnGuildBanRemove extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'GUILD_BAN_REMOVE';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
