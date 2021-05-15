const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class ShardingCreating extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'SHARDING_CREATING';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
