declare module 'goche' {
	export abstract class ObjectManager<K, R> extends Map {
		get(key: any): R
		toArray(): Array<R>
	}

	export type Intents = [
		'directMessageReaction',
		'directMessageTyping',
		'directMessages',
		'guildBan',
		'guildEmoji',
		'guildIntegrations',
		'guildInvites',
		'guildMembers',
		'guildMessage',
		'guildMessageReaction',
		'guildMessageTyping',
		'guildPresence',
		'guildVoiceState',
		'guildWebhook',
		'guilds'
	]

	export type IgnoreCacheList = [
		'applicationCommandCreate',
		'applicationCommandUpdate',
		'applicationCommandDelete',
		'channelUpdate',
		'channelDelete',
		'channelCreate',
		'channelPinsUpdate',
		'threadCreate',
		'threadUpdate',
		'threadDelete',
		'threadListSync',
		'threadMemberUpdate',
		'threadMembersUpdate',
		'guildCreate',
		'guildUpdate',
		'guildDelete',
		'guildBanAdd',
		'guildBanRemove',
		'guildEmojisUpdate',
		'guildMemberAdd',
		'guildMemberUpdate',
		'guildMembersChunk',
		'guildRoleCreate',
		'guildRoleUpdate',
		'guildRoleDelete',
		'integratonCreate',
		'integratonUpdate',
		'integratonDelete',
		'interactionUpdate',
		'interactionCreate',
		'interactionDelete',
		'inviteCreate',
		'inviteDelete',
		'messageCreate',
		'messageDelete',
		'messageUpdate',
		'messageDeleteBulk',
		'messageReactionAdd',
		'messageReactionUpdate',
		'messageReactionDelete',
		'messageReactionDeleteAll',
		'messageReactionDeleteEmoji',
		'presenceUpdate',
		'typingStart',
		'userUpdate',
		'voiceStateUpdate',
		'voiceServerUpdate',
		'webhooksUpdate'
	]
	export class GocheLibrary {
		private token: string
		mode: string | 'default'
		httpManager: HttpAPI
		client: GocheClient
		listenerManager: GocheListenerAdapter
		requestManager: HttpAPI
		gocheController: GocheController
		slashManager: SlashManager
		activities: Activities
		intentManager: IntentsManager
		dataManager: DataManager
		requestConfigBuilder: RequestControlAction
		constructor(token: string)

		/**
		 *  @GocheLibrary This method is used to retrieve events and metadata on the fly. They are not stored in a cache.
		 *	@deprecated
		 *  @GhocheWarn Includes that you should not be able to search for the methods that are saved in the library's sub cache.
		 */
		light(): this

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
		 * @param {string<sharding>} mode Defines the way the profile wants you to work
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
		createProfile(mode?: string, ...shardInt): this

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
		setIntents(intents: Array<string>): this

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
		 *       'channelUpdate',
		 *       'channelDelete',
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
		ignoreCache(ignoreCache: Array<string>): this
	}

	export interface OptionsClientI {
		gocheLibrary: GocheLibrary
	}
	export class GocheClient {
		profile: string
		goche: GocheLibrary
		heartbeart: Heartbeart
		private token: string
		wsManager: WebsocketManager
		guilds: ObjectManager<string, Guild>
		users: ObjectManager<string, Guild>
		intentManager: IntentsManager
		cacheManager: CacheManager
		ignoreCacheManager: IgnoreCacheManager
		intents: number
		shard: number
		selfUser: SelfUser | null
		uptimeMaster: Date | number

		constructor(options: OptionsClientI)
	}

	export class DataManager {
		wsData: number
		dataAPI: number
	}

	export class Heartbeart {
		gocheClient: GocheClient
		uptime: number
		seq: number
		ping: number
		attempts: number
		requests: number
		wsSendMesssages: number
		wsReceivedMessage: number
		cache: number
		mapSaved: number
		updateObjects: number
		rateLimit: number
	}
	export class CacheManager {
		changesObject: number
		changesRevoked: number

		eventsDisabled: Array<String>
		eventsStuck: number

		serversUpdated: number
		usersUpdated: number
		messageUpdated: number
		messageRemoved: number

		cacheRemoved: number
		cacheFailed: number
		cacheCritical: number
		newCache: number
		oldCache: number
		cacheChanged: number
		cacheAbuse: number
		cacheCrusched: number

		methodUsed: number
		requestCreated: number

		queueRateLimit: Array<String>
	}
	export class HttpAPI {}

	export class GocheListenerAdapter {
		listeners: Array<GocheListener>
		client: GocheClient
		eventRegistered: number
		eventCount: number

		addListener(listener: GocheListener):this
	}


	export class GochePacketManager {
		url: string
		secret: string
		ws: WebSocket

		setURL(url: string): this
	
		setToken(secret: string): this
		build(): this
	}


	export class IgnoreCacheManager {
		cache: Map<string, string>
		cacheSelected: Map<string, string>
	}

	export class GocheController {
		listeners: Array<any>
		client: GocheLibrary
		eventRegistered: number
		eventCount: number

	}


	export class Activities {
		name: string
		type: string
		url: string
		details: string
		since: Date.now
		status: 'online'
	}

	export class SelfUser {
		user: User;
		application: Application;
		sessionID: string;
		rtc_regions: Array;
	}

	export class IntentsManager {
		intentsList: Intents
		intentsSelected: Intents
		intents: number
	}

	export class RequestControlAction {
		queue: number
		limitQueue: boolean
		ignoreRequest: boolean
		ignorePath: Array
	}

	/**
	 * ENTITIES
	 */

	/**
	 *
	 */

	export class Application {
		id: string
		flags: number | 0
	}

	export class BanInfo {
		reason: string
		user: User
	}

	export type ChannelType = {
		0: 'guildText'
		1: 'dm'
		2: 'guildVoice'
		3: 'groupDM'
		4: 'guildCategory'
		5: 'guildNews'
		6: 'guildStore'
		10: 'guildNewsThread'
		11: 'guildPublicThread'
		12: 'guildPrivateThread'
		13: 'guildStageVoice'
	}

	export class Channel {
		type:
			| 'guildText'
			| 'guildVoice'
			| 'groupDM'
			| 'guildCategory'
			| 'guildNews'
			| 'guildStore'
			| 'guildNewsThread'
			| 'guildPublicThread'
			| 'guildPrivateThread'
			| 'guildStageVoice'
		guild: Guild
		gocheLibrary: GocheLibrary
		channel: this
		id: string
		position: number
		name: string
		topic: string
		nsfw: boolean
		lastMessageID: string | null
		messagesQueue: ObjectManager<string, Message>

		delete(): this
	}

	export interface Ban {
		user: User
		reason: reason
		time: number
	}

	export class Embed {
		title: string
		description: string
		fields: Array
		author: object
	}
	export class Message {
		gocheLibrary: GocheLibrary
		reactions: any
		id: string
		type: string
		isInteraction: boolean
		content: string
		tts: boolean
		timestamp: string
		edited: number
		embeds: Array<Embed>
		referencedMessage: any
		pinned: boolean
		nonce: number | string
		mention: Array<User>
		member: Member
		components: string
		channelID: string
		channel: TextChannel
		user: User
		attachments: Array<any>
		messageQueue: MessageQueue
	}

	export interface DataOptions {
		embed: object
	}
	export class MessageQueue {
		editMessage(data: DataOptions | string): Message
		deleteMessage(time?: number): Message
	}

	export class TextChannel extends Channel {
		messagesQueue: MessageQueue
		sendMessage(data: DataOptions | string): Message
	}
	export class VoiceChannel extends Channel {
		userLimit: number
		position: number
		region: string
	}

	export class MessageFlags {}

	export class VoiceState {
		type = 'voiceState';
		voiceChannel?: VoiceChannel
		channelID: string
		sessionID: string
		selfVideo: boolean
		selfMute: boolean
		selfDeaf: boolean
		requestToSpeakTimestamp: string
		mute: boolean
		deaf: boolean
		suppress: boolean
	}
	export class Member {
		user: User
		roles: ObjectManager<string, Role>;
		pending: boolean
		nick: string
		joinedAt: number
		premiumSince: number
		hoistedRole: Role
		mute: boolean
		deaf: boolean
		voiceState: VoiceState
	}

	export class User {
		type: string | 'bot' | 'user'
		username: string
		discriminator: string
		id: number
		flags?: Array<String>
		isBot: boolean
		avatar: string
		mention: string
		tag: string
	}
	export class Guild {
		id: string
		name: string
		description: string
		icon: string
		splash: string
		discoverySplash: string
		owner: Member
		ownerID: string
		afkChannel: VoiceChannel
		afkTimeout: number
		explicitContentFilter: number
		features: Array<string>
		joinedAt: number
		large: boolean
		unavailable: boolean
		membersCount: number
		voiceStates: Array<VoiceChannel>
		shardID: number
		roles: ObjectManager<string, Role>
		roleManager: ObjectManager<string, Member>
		emojis: ObjectManager<string, EmojiInfo>
		members: ObjectManager<string, Member>
		channels: ObjectManager<string, Channel>
		category: ObjectManager<string, Channel>
		voiceChannels: ObjectManager<string, VoiceChannel>
		presences: Array<PresenceMember>

		fetchUser(user: string): User
		fetchBans(user: string): BanInfo
		fetchUserBan(id: string): BanInfo
		ban(member: Member, delDays: number): AddBanAction
		removeBan(member: Member): BanInfo
	}

	export class DMChannel extends Channel {
		messagesQueue: MessageQueue
		sendMessage(data: DataOptions | string): Message
	}
	export class AddBanAction {
		guild: Guild
		gocheClient: GocheClient
		user: User
		reason: string
		deleteMessageDays: number
		time: number

		setReason(reason: string): this
	}
	export class Role {
		id: string
		type = 'role';
		name: string
		isMentionable: boolean
		managed: boolean
		hoist: boolean
		color: string
		guild: Guild;
	}


	export class ReactionAddEvent {
		userID: string
        messageID: string
        member: Member
        emoji: Emoji
        channelID: string
        guild?: Guild
	}

	export class ReactionRemoveEvent {
		userID: string
        messageID: string
        member: Member
        emoji: Emoji
        channelID: string
        guild?: Guild
	}

	export class Emoji {
		name?: string | null
		id?: string | null 
	}
	export class PresenceMember {}

	export class EmojiInfo {}

	export class WebsocketManager {
		constructor(gocheClient: GocheClient)
	}


	
	export class OnGuildChannelStateEvent extends GocheListener {} 
	export class OnMemberJoinChannel extends GocheListener {}
	export class OnMemberLeaveChannelEvent extends GocheListener {}
	export class OnChannelCreateEvent extends GocheListener {}
	export class OnChannelDeleteEvent extends GocheListener {}
	export class OnChannelUpdateEvent extends GocheListener {}
	export class OnChannelUpdateEvent extends GocheListener {}
	export class OnGuildBanRemove extends GocheListener {}
	export class OnGuildMessageEvent extends GocheListener {}
	export class OnGuildInteractionEvent extends GocheListener {}
	export class OnGuildMemberAddEvent extends GocheListener {}
	export class OnGuildMemberAddEvent extends GocheListener {}
	export class OnGuildMessageEditEvent extends GocheListener {}
	export class OnGuildMessageEvent extends GocheListener {}
	export class OnGuildMessageEvent extends GocheListener {}
	export class OnGuildRemove extends GocheListener {}
	export class OnGuildMessageEditEvent extends GocheListener {}
	export class OnGuildRoleCreateEvent extends GocheListener {}
	export class OnGuildRoleDeleteEvent extends GocheListener {}
	export class OnGuildRoleUpdateEvent extends GocheListener {}
	export class OnMessageReactionAddEvent extends GocheListener {}
	export class OnMessageReactionRemoveEvent extends GocheListener {}
	export class OnMessageReactionUpdateEvent extends GocheListener {}
	export class ShardingCloseCode extends GocheListener {}
	export class ShardingCreating extends GocheListener {}
	export class ShardingDebug extends GocheListener {}
	export class ShardingDisconnect extends GocheListener {}
	export class ShardingQueue extends GocheListener {}
	export class ShardingReconnecting extends GocheListener {}

	export class GocheListener<R> {
		on(data: any): void
	}



}
