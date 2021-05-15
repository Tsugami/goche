const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class ShardingDebug extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'SHARDING_DEBUG';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
