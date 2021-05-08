module.exports = {
	/**
	 * src
	 */
	GocheLibrary: require('./GocheLibrary'),

	/**
	 * utils
	 */
	EmbedBuilder: require('./utils/EmbedBuilder'),
	PayloadSlashCommandsResponse: require('./utils/Payload_SlashCommands_Response'),
	Payload: require('./utils/Payload'),
	SlashInteraction: require('./utils/SlashInteraction'),
	SlashOptions: require('./utils/SlashOptions'),

	/**
	 * Manager
	 */
	GocheClient: require('./manager/GocheClient'),

	/**
	 * Events
	 */
	OnChannelCreateEvent: require('./events/listeners/guild/OnChannelCreateEvent'),
	OnChannelDeleteEvent: require('./events/listeners/guild/OnChannelDeleteEvent'),
	OnChannelUpdateEvent: require('./events/listeners/guild/OnChannelUpdateEvent'),
	OnGuildBanAddEvent: require('./events/listeners/guild/OnGuildBanAddEvent'),
	OnGuildBanRemove: require('./events/listeners/guild/OnGuildBanRemove'),
	OnGuildCreateEvent: require('./events/listeners/guild/OnGuildCreateEvent'),
	OnGuildRemoveEvent: require('./events/listeners/guild/OnGuildRemoveEvent'),
	OnGuildInteractionEvent: require('./events/listeners/guild/OnGuildInteractionEvent'),
	OnGuildMessageEvent: require('./events/listeners/guild/OnGuildMessageEvent'),
	OnGuildMessageReactionEvent: require('./events/listeners/guild/OnGuildMessageReactionEvent'),
	OnGuildRoleCreateEvent: require('./events/listeners/guild/OnGuildRoleCreateEvent'),
	OnGuildRoleDeleteEvent: require('./events/listeners/guild/OnGuildRoleDeleteEvent'),
	OnGuildChannelStateEvent: require('./events/listeners/guild/voice/OnGuildChannelStateEvent'),
	OnMemberJoinChannelEvent: require('./events/listeners/guild/voice/OnMemberJoinChannelEvent'),
	OnMemberLeaveChannelEvent: require('./events/listeners/guild/voice/OnMemberLeaveChannelEvent'),
};
