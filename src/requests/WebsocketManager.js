const ConnectionManager = require('../api/ConnectionManager');
const GocheClient = require('../manager/GocheClient');
const ShardInfo = require('../utils/ShardInfo');
const ShardInfoManager = require('../utils/ShardInfoManager');

module.exports = class WebsocketManager {
	constructor(client = new GocheClient()) {
		this.gocheClient = client;
		/**
		 * You can manage the Websocket Connection that you will get within the class
		 */
		this.connectionList = new Map();

		/**
		 * This is a queue for when a shard has events and starts another one in each order. This process can take time.
		 * The recommended connection accepted is a maximum of 2,500 shards.
		 */
		this.queue = []
		this.shardsInfo = new ShardInfoManager()
		this.shardPosition = 0
		this.totalShards = 0
		this.intents = 0
		this.starting = 0
		this.finished = false
	}

	nextQueue() {
		
		if (this.queue[0] === 0) {
			this.queue.shift()
			const shardInQueue = this.queue[0]
			this.createConnection(shardInQueue, this.totalShards, this.intents)
			
			this.gocheClient.goche.listenerManager.listeners
			.filter(
				(eventClass) =>
					eventClass.eventName ===
					'SHARDING_QUEUE'
			)
			.map((eventClass) =>
				eventClass.on({
					shardInQueue: shardInQueue,
					totalShards: this.totalShards,
					intents: this.intents,
					finish: this.finished
				})
			);
		} else {
			this.queue.shift()
			if (this.queue.length === 0) {
				
				if (this.finished === false) {
					this.finished = true
					
					this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							'SHARDING_QUEUE'
					)
					.map((eventClass) =>
						eventClass.on({
							shardInQueue: this.totalShards,
							totalShards: this.totalShards,
							intents: this.intents,
							finish: this.finished
						})
					);
				}
			} else {
			
				const shardInQueue = this.queue[0]
		
				this.createConnection(shardInQueue, this.totalShards, this.intents)
			
				this.gocheClient.goche.listenerManager.listeners
				.filter(
					(eventClass) =>
						eventClass.eventName ===
						'SHARDING_QUEUE'
				)
				.map((eventClass) =>
					eventClass.on({
						shardInQueue: shardInQueue,
						totalShards: this.totalShards,
						intents: this.intents,
						finish: this.finished
					})
				);
			}
		}
	}


	createConnection(shardInt, shardTotal, intents) {
	
		this.shardPosition = shardInt
		const connection = new ConnectionManager(
			this,
			shardInt - 1, intents
		);
		
		this.gocheClient.goche.listenerManager.listeners
		.filter(
			(eventClass) =>
				eventClass.eventName ===
				'SHARDING_CREATING'
		)
		.map((eventClass) =>
			eventClass.on(connection)
		);
		this.connectionList.set(
			shardInt - 1,
			connection
		);
		connection.connect(
			'sharding'
		);
	}

	connect(...args) {

		let nb = args[0] === 0 ? args[0] : args[0];

		const arrayShards = Array.from(
			{
				length:
				args[0] === 0 ? args[1] + 1 : args[1] - args[0],
			},
			(data) => (nb++)
		);

		let shardPosition = args[0] - 1;
		
		this.totalShards = args[1]
		this.intents = args[2]

		if (arrayShards[0] === -1) {
			arrayShards.shift()
		}

		arrayShards.map(shard => {
			this.queue.push(shard)
			
			if (shard === 0) {
				this.shardsInfo.create(shard, new ShardInfo(shard, this))
		
			} else {
				this.shardsInfo.create(shard, new ShardInfo(shard, this))
			}
		})
		setTimeout(() => {
			
			this.nextQueue()
		}, 1 * 1000)
		/**
		 *
		 * 
		 * @deprecated
		 * @version 0.0.1
		 * @description This function is discontinued due to tests that have been carried out.
		 * for (let shard of arrayShards) {
	
			shardPosition+= 1
	
			const data = this;
		
	
			if (shardPosition > 20) {
				setTimeout(() => {
					const connection = new ConnectionManager(
						data,
						shard, args[2]
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
					
					
				}, 1 * 1000);
			}
		}
		 */
		
	}
};
