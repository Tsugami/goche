const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class ShardingDisconnect extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'SHARDING_DISCONNECT';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
