const CacheEvents = require('../utils/CacheEvents');

module.exports = class IgnoreCacheManager {
	constructor() {
		this.cache = new Map();
		this.cacheSelected = new Map();
		this.cacheList = CacheEvents;
	}
	/**
	 *
	 * @param {*} nameOfEvent
	 * You just need to inform the name of the event in having to disable it through the Boolean. That there is no need!
	 * @example
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
	add(nameOfEvent) {
		if (typeof this.cacheList[nameOfEvent] === 'string') {
			if (
				typeof this.cache[nameOfEvent] ===
				'undefined'
			) {
				this.cacheSelected.set(
					nameOfEvent,
					this.cacheList[nameOfEvent]
				);
				this.cache.set(
					this.cacheList[nameOfEvent],
					nameOfEvent
				);
			}
		}
	}

	remove(nameOfEvent) {
		if (typeof this.cacheList[nameOfEvent] === 'string') {
			if (typeof this.cache[nameOfEvent] === 'string') {
				this.cache.delete(nameOfEvent);
			}
		}
	}

	get(nameOfEvent) {
		if (typeof this.cache.get(nameOfEvent) === 'string') {
			return {
				ok: true,
				event: nameOfEvent,
			};
		}
		return {
			ok: false,
			event: null,
		};
	}
};
