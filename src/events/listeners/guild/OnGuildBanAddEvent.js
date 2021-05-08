const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class OnGuildBanAdd extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'GUILD_BAN_ADD';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
