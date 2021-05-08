const WebSocket = require('ws');
const ConnectionManager = require('../api/ConnectionManager');
const GocheInfo = require('../GocheInfo');
const GocheClient = require('../manager/GocheClient');

module.exports = class WebsocketManager {
	constructor(client = new GocheClient()) {
		this.gocheClient = client;
		/**
		 * You can manage the Websocket Connection that you will get within the class
		 */
		this.connectionList = new Map();
	}

	connect(type) {
		let nb = 0;

		const arrayShards = Array.from(
			{
				length:
					Number(
						this.gocheClient
							.shard
					) -
					Number(
						this.gocheClient
							.shardInt
					),
			},
			(data) => (nb = nb + this.gocheClient.shardInt)
		);

		for (let shard of arrayShards) {
			const data = this;
			const shardNb = shard;

			if (shard > 20) {
				setTimeout(() => {
					const connection = new ConnectionManager(
						data,
						shard
					);
					this.connectionList.set(
						shard,
						connection
					);
					connection.connect(
						'sharding'
					);
				}, 6 * 1000);
			} else {
				setTimeout(() => {
					const connection = new ConnectionManager(
						data,
						shard
					);
					this.connectionList.set(
						shard,
						connection
					);
					connection.connect(
						'sharding'
					);
				}, 1 * 1000);
			}
		}
	}
};
