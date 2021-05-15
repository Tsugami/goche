const GocheLibrary = require('../../../GocheLibrary');
const GocheListener = require('../GocheListener');

module.exports = class ShardingCloseCode extends GocheListener {
	constructor(data) {
		super();
		this.eventName = 'SHARDING_CLOSE_CODE';
		this.gocheLibrary = new GocheLibrary();
	}

	on(data) {}
};
