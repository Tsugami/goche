const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class ShardingReconnecting extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'SHARDING_RECONNECTING';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
