const GocheListener = require('./events/listeners/GocheListener');
const GocheListenerAdapter = require('./events/GocheListenerAdapter');
const GocheClient = require('./manager/GocheClient');
const httpManager = require('./requests/httpManager');
const GocheController = require('./hooks/GocheController');
const SlashManager = require('./action/guild/SlashCommand');
const Activities = require('./action/user/Activities');
const RequestControlAction = require('./action/RequestControlAction');
const IntentsManager = require('./manager/IntentsManager');

module.exports = class GocheLibrary {
	/**
	 * @param {*} token This token is used to connect **Websocket** and **create requests**.
	 */
	constructor(token = '') {
		this.mode = 'default';

		this.token = token;
		Object.defineProperty(this, 'token', {
			configurable: false,
			enumerable: false,
			writable: false,
			value: token,
		});
		this.httpManager = new httpManager(this);
		this.client = new GocheClient(this.mode, this);
		this.listenerManager = new GocheListenerAdapter(this);
		this.requestManager = new httpManager(this);
		this.gocheController = new GocheController(this);
		this.slashManager = new SlashManager(this);
		this.activities = new Activities().setStatus('online');
		this.intentManager = new IntentsManager()
		this.requestConfigBuilder = new RequestControlAction().setQueue(
			5
		); // Default is 5
	}

	/**
	 *  @GocheLibrary This method is used to retrieve events and metadata on the fly. They are not stored in a cache.
	 *
	 *  @GhocheWarn Includes that you should not be able to search for the methods that are saved in the library's sub cache.
	 */
	light() {
		this.mode = 'light';
		return this;
	}

	/**
	 *  @GocheLibrary This profile will release and store the metadata in a cache that is picked up by the `listeners`.
	 * You can add it via the `addListener` method.
	 * @param {*} mode Defines the way the profile wants you to work
	 *
	 * ```
	 * const goche = new GocheLibrary()
	 *                      .createProfile()
	 * ```
	 * ### **Sharding**
	 *
	 * @param {*} mode Defines the way the profile wants you to work
	 * @param {...any} shardInt Defines the list of shards you want to work on.
	 *
	 *
	 *
	 * ```
	 * const goche = new GocheLibrary()
	 *                  .createProfile('sharding', 2)
	 * ```
	 *
	 *
	 *
	 *
	 */

	createProfile(mode, ...shardInt) {

		setTimeout(() => {
			this.mode = 'profile';
		if (mode === 'sharding') {
			if (typeof shardInt[1] === 'number') {
				if (shardInt[0] > shardInt[1]) {
					throw Error(
						'You have exceeded the limit on the number of Shards you have set up'
					);
				} else {
					this.client.shardInt = shardInt[0] - 1;		
					this.client.shard =	shardInt[1];
					this.client.wsManager.connect(shardInt[0] - 1, shardInt[1], this.intentManager.intents);
					return this;
				}
			}
			if (typeof shardInt[0] === 'number') {
				this.client.shard = shardInt[0];
				this.client.wsManager.connect(0, shardInt[0], this.intentManager.intents);
				return this;
			} else {
				this.client.shard = 1;
				this.client.wsManager.connect(0, shardInt[0], this.intentManager.intents);
				return this;
			}
		}

		this.client.wsManager.connect(0, 1, this.intentManager.intents);
		}, 1 * 1000)

		return this;
	}

	/**
     * @param {*} intents 
     * @returns GocheLibrary
     * @description If you are placing an invalid intent, it will not be counted and will also not return any errors. The chances of connecting are small.
     * @example
     * ```
     *  const goche = new GocheLibrary()
     *                  .setIntents(
     *                          [
     *                             'guild',
     *                             'guildMembers'
     *                          ]
     *                  )
     * ```
     * @Intents
     * ```
     *  directMessageReaction: 8192
        directMessageTyping: 16384
        directMessages: 4096
        guildBan: 4
        guildEmoji: 8
        guildIntegrations: 16
        guildInvites: 64
        guildMembers: 2
        guildMessage: 512
        guildMessageReaction: 1024
        guildMessageTyping: 2048
        guildPresence: 256
        guildVoiceState: 128
        guildWebhook: 32
        guilds: 1
     * ```
     */
	setIntents(intents = ['']) {
		if (typeof intents === 'object') {
			for (let intent of intents) {
				if (typeof intent === 'string') {
					this.intentManager.add(
						intent
					);
				}
			}
		}
		return this;
	}

	/**
	 * @param {*} caches
	 * @returns GocheLibrary
	 * @description You can `limit` Goche to some events that are `received` by the `Websocket`.
	 * @example
	 *  ```
	 * const goche = new GocheLibrary()
	 *                  .ignoreCache(['guildCreate'])
	 * ```
	 *
	 *   * @example
	 * [
	 *       'applicationCommandCreate',
	 *       'applicationCommandUpdate',
	 *       'applicationCommandDelete',
	 *       'channelCreate',
	 *       'channelCreate',
	 *       'channelCreate',
	 *       'channelPinsUpdate',
	 *       'threadCreate',
	 *       'threadUpdate',
	 *       'threadDelete',
	 *       'threadListSync',
	 *       'threadMemberUpdate',
	 *       'threadMembersUpdate',
	 *       'guildCreate',
	 *       'guildUpdate',
	 *       'guildDelete',
	 *       'guildBanAdd',
	 *       'guildBanRemove',
	 *       'guildEmojisUpdate',
	 *       'guildMemberAdd',
	 *       'guildMemberUpdate',
	 *       'guildMembersChunk',
	 *       'guildRoleCreate',
	 *       'guildRoleUpdate',
	 *       'guildRoleDelete',
	 *       'guildRoleDelete',
	 *       'integratonCreate',
	 *       'integratonUpdate',
	 *       'integratonDelete',
	 *       'interactionUpdate',
	 *       'interactionCreate',
	 *       'interactionDelete',
	 *       'inviteCreate',
	 *       'inviteDelete',
	 *       'messageCreate',
	 *       'messageDelete',
	 *       'messageUpdate',
	 *       'messageDeleteBulk',
	 *       'messageReactionAdd',
	 *       'messageReactionUpdate',
	 *       'messageReactionDelete',
	 *       'messageReactionDeleteAll',
	 *       'messageReactionDeleteEmoji',
	 *       'presenceUpdate',
	 *       'typingStart',
	 *       'userUpdate',
	 *       'voiceStateUpdate',
	 *       'voiceServerUpdate',
	 *       'webhooksUpdate'
	 * ]
	 */
	ignoreCache(caches = ['']) {
		if (typeof caches === 'object') {
			for (let cache of caches) {
				if (typeof cache === 'string') {
					this.client.ignoreCacheManager.add(
						cache
					);
				}
			}
		}
		return this;
	}

	/**
	 *
	 * @param {*} activities Recommended to use the Activities class
	 * @description This method only works with the Activities class that provides options for you to work.
	 * Also if you insert anything the method can ignore it and the results cannot go as you think.
	 * @example
	 * ```
	 *  const goche = new setActivities()
	 *                  .setIntents(
	 *                          new Activities()
	 *                                  .setListening('Hello World')
	 *                                  .setStatus('online')
	 *                  )
	 * ```
	 */
	setActivities(activities) {
		if (typeof activities === 'object') {
			if (activities instanceof Activities) {
				this.activities = activities;
				if (
					this.client.wsManager
						.ready === true
				) {
					this.client.wsManager.setActivities();
				}
			}
		}
	}

	setConfigRequestBuilder(requestConfig = new RequestControlAction()) {
		if (requestClass instanceof RequestControlAction) {
		}
	}
};
