const WebsocketManager = require('../requests/WebsocketManager');
const GocheInfo = require('../GocheInfo');
const WebSocket = require('ws');
const GatewayError = require('../error/GatewayError');
const DebugSharding = require('../utils/DebugSharding');

module.exports = class ConnectionManager {
	constructor(websocketManager = new WebsocketManager(), shardID, intents) {
		this.status = 'NO_REPLY';
		this.ws = null;
		this.gocheClient = websocketManager.gocheClient
		this.websocketManager = websocketManager;
		this.shardID = shardID;
		this.uptime = Date.now();
		this.ping = 0;
		this.seq = 0;
		this.data = {
			/**
			 * That is objects of verification guild.
			 */
			guilds: [],
		};
		this.heart = null;
		this.lantecy = Date.now();
		this.ready = false;
		this.intents = intents;
		
	}

	updateStatusShard(status) {
		this.debug('debug', this)
		this.websocketManager.shardsInfo.shardsMap.get(this.shardID).status = status
		this.websocketManager.shardsInfo.shardsArray[this.shardID].status = status
		this.status = status
	}


	

	debug(nameFunction, data) {
		this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							'SHARDING_DEBUG'
					)
					.map((eventClass) =>
						eventClass.on(new DebugSharding(nameFunction, data))
					);
	}

	connecting() {
		this.websocketManager.connectionList.delete(this.shardID);
		const shard = new ConnectionManager(
			this.websocketManager,
			this.shardID,
			this.intents
		)
		this.websocketManager.connectionList.set(
			this.shardID,
			shard
			
		);
		shard.connect('sharding');
		this.debug('connecting', this)
		this.updateStatusShard('CONNECTING')
		
	}

	ok(type, intents, id) {
		this.updateStatusShard('PREPARING_THE_SHARD')
		this.debug('preparing', this)
		this.ws.on('open', (ws) => this.identify(type, this
			.intents === 0
			? false
			: true), this.updateStatusShard('OPEN'));
		this.ws.on('error', (err) => {
			
			switch (err.stack.code) {
				case 'ETIMEDOUT':
					console.error(
						'There was a network connection failure and therefore it was not possible to connect to Discord'
					);
					this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							'SHARDING_DISCONNECT'
					)
					.map((eventClass) =>
						eventClass.on(this)
					);
					this.debug('error', {
						message: 'There was a network connection failure and therefore it was not possible to connect to Discord',
						code: 'ETIMEDOUT'
					})
					this.updateStatusShard('ETIMEDOUT')
					break;
				default: 
				this.debug('error', {
					message: `${e.message}`,
					code: err.stack.code
				})
				this.updateStatusShard(err.stack.code)
			}

			this.connecting();
		});
		this.ws.on('close', (code, reason) => {
			switch(code) {
				case 1005:
					this.connecting();
				break;
			}

			this.updateStatusShard('CLOSE')
			this.ready = false;
			if (typeof GatewayError[code] === 'object') {
				const errorGateway = GatewayError[code]
				this.debug('close', errorGateway)
				switch(code) {
					case 4000:
						this.updateStatusShard('RECONNECTING')
						this.debug('close', errorGateway)
						this.gocheClient.goche.listenerManager.listeners
						.filter(
							(eventClass) =>
								eventClass.eventName ===
								'SHARDING_CLOSE_CODE'
						)
						.map((eventClass) =>
							eventClass.on(errorGateway)
						);
						this.connecting()
						break;
					default: 
						this.updateStatusShard('RECONNECTING')
						this.debug('close', errorGateway)
						this.gocheClient.goche.listenerManager.listeners
						.filter(
							(eventClass) =>
								eventClass.eventName ===
								'SHARDING_CLOSE_CODE'
						)
						.map((eventClass) =>
							eventClass.on(errorGateway)
						);
						this.connecting()
				}
			}
		});
	
		this.ws.on('message', async (message) => {
		
			let data = JSON.parse(message);
			if (typeof data.t === 'string') {
				switch (data.t) {
					case 'READY':
						this.updateStatusShard('OK')
						this.debug('debug', this)
						if (typeof this.websocketManager.shardsInfo.shardsMap.get(this.shardID) === 'undefined') {
							
						} else {
							
							const shardInfo = this.websocketManager.shardsInfo.shardsMap.get(this.shardID)
							if (this.websocketManager.finished === false) {
								if (shardInfo.ready === false) {
									this.websocketManager.nextQueue()
									shardInfo.ready = true
								}
								
							}
						}
					break;
				}
			}
			if (typeof data.t === 'string') {
				if (typeof data.d === 'object') {
					data.d.shard = this.shardID;
				}
				if (
					this.websocketManager.gocheClient.ignoreCacheManager.get(
						data.t
					).ok === true
				) {
					return;
				}
			}

			this.websocketManager.gocheClient.heartbeart
				.wsReceivedMessage++;
			if (typeof data.s === 'number') {
				this.seq++;
			}
			switch (data.op) {
				case 11:
					this.ping =
						Date.now() -
						this.lantecy;
					break;
				case 10:
					const sendHeart = async () => {
						this.lantecy = Date.now();

						await this.send({
							op: 1,
							d: this
								.seq,
						});
					};

					this.heart = setInterval(
						async function () {
							sendHeart();
						},
						data.d
							.heartbeat_interval
					);
					break;
				case 7:
					this.sendListener(data);
					this.reconnect(
						7,
						data,
						'It looks like there was a problem with server connection or Discord made a request to reconnect'
					);
					break;
				case 9:
					this.sendListener(data);
					this.reconnect(
						9,
						data,
						'It seems that Discord gave up on this connection because the previous one there was a stabilized connection and in a few seconds I will reconnect'
					);
				default:
					this.websocketManager.gocheClient.goche.gocheController.updateCache(
						data,
						this.shardID
					);
					delete data.d;
					delete data.op;
			}
		});
		return this;
	}
	connect(type) {
		this.updateStatusShard('CONNECTING')
		this.ws = new WebSocket(
			`wss://gateway.discord.gg/?v=${GocheInfo.DISCORD_REST}&encoding=json`
		);
		this.ok(
			type,
			this
				.intents === 0
				? false
				: true
		);
	}

	sendListener(data) {
		this.websocketManager.gocheClient.goche.listenerManager.listeners
			.filter(
				(eventClass) =>
					eventClass.eventName ===
					'GATEWAY_LISTENER'
			)
			.map((eventClass) =>
				eventClass.on(
					new OPIdentify(data, false)
				)
			);
	}
	send(data) {
		this.websocketManager.gocheClient.goche.listenerManager.listeners
			.filter(
				(eventClass) =>
					eventClass.eventName ===
					'GATEWAY_LISTENER'
			)
			.map((eventClass) =>
				eventClass.on(
					new OPIdentify(data, true)
				)
			);

		data.shard = this.shardID;
		this.ws.send(JSON.stringify(data));
		return data;
	}

	revokedToken(type, intents) {
		this.debug('revokedToken', {
			revokedToken: true
		})
		this.updateStatusShard('IDENTIFYING')
		this.identify(type, this
			.intents === 0
			? false
			: true);
	}

	setActivities(activities) {
		this.debug('revokedToken', {
			setActivities: true
		})
		this.send({
			op: 3,
			d: {
				game: this.websocketManager.gocheClient.goche.activities.presenceWS(),
				status: this.websocketManager
					.gocheClient.goche.activities
					.status,
				afk: false,
			},
		});
	}

	/**
	 *
	 * This part is for reconnecting to the Websocket and resuming the session back. **This method was not created to recreate or disconnect,
	 * to create closure of the websocket.** Only to **resume** the `session`!
	 */
	async reconnect(op, message, reason) {
		this.gocheClient.goche.listenerManager.listeners
		.filter(
			(eventClass) =>
				eventClass.eventName ===
				'SHARDING_RECONNECTING'
		)
		.map((eventClass) =>
			eventClass.on({
				op: op,
				message: message,
				reason: reason,
				shardID: this.shardID
			})
		);
		switch (op) {
			case 9:
				this.debug('debug', this)
				this.updateStatusShard('RECONNECTING')
				/**
				 * When you turn it on and off, turn it on again as Discord asks you to return to the previous session that was created.
				 * So this function will restore the previous session but it will not recover lost events either.
				 */
				this.resuming(message);
				break;
			case 7:
				/**
				 * From what I understand when the bot does not receive many events, sometimes it asks to reconnect.
				 * Otherwise, if there is a connection problem, this option may return.
				 */
				this.debug('debug', this)
				this.updateStatusShard('OUT_OF_TIME')
				this.send({
					op: 6,
					d: {
						token: this
							.websocketManager
							.gocheClient
							.token,
						session_id: this
							.websocketManager
							.gocheClient
							.selfUser
							.sessionID,
						seq: this.seq,
					},
				});
				break;
		}

		return this;
	}

	/**
	 * @prop { t: null, s: null, op: 9, d: true || false }
	 * To resume the session
	 */
	resuming(message, type, intents) {
		this.debug('debug', this)
		this.updateStatusShard('RESUMING')
		if (message.d === false) {
			/**
			 * When you turn it on and off, turn it on again as Discord asks you to return to the previous session that was created.
			 * So this function will restore the previous session but it will not recover lost events either.
			 */
			this.identify(type, this
				.intents === 0
				? false
				: true);
		}
		return this;
	}

	async identify(type, intents) {
		
		this.updateStatusShard('IDENTIFYING')
		this.ready = true;


		const data = {
			op: 2,
			d: {
				token: this.websocketManager.gocheClient
					.token,
				v: GocheInfo.DISCORD_REST,
				guild_subscriptions: true,
		
    			"large_threshold": 250,
				shard: [
					this.shardID,
					this.websocketManager
						.totalShards,
				],
				presence: {
					game: this.websocketManager.gocheClient.goche.activities.presenceWS(),
					status: this.websocketManager
						.gocheClient.goche
						.activities.status,

					afk: false,
				},

				properties: {
					os: process.platform,
					browser:
						'Goche - https://github.com/NavyCake/Goche',
					device:
						'Goche - https://github.com/NavyCake/Goche',
				},
			},
		};
		if (intents === true) {
			
			data.d.intents = Number(this.intents);
		}
		this.debug('debug', this)
		await this.send(data);

		await this.send({
			op: 1,
			d: this.seq,
		});
	}
};
