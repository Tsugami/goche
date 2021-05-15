const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class ShardingQueue extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'SHARDING_QUEUE';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
