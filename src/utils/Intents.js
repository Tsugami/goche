module.exports = {
	intents: {
		guilds: 1 << 0,
		guildMembers: 1 << 1,
		guildBan: 1 << 2,
		guildEmoji: 1 << 3,
		guildIntegrations: 1 << 4,
		guildWebhook: 1 << 5,
		guildInvites: 1 << 6,
		guildVoiceState: 1 << 7,
		guildPresence: 1 << 8,
		guildMessage: 1 << 9,
		guildMessageReaction: 1 << 10,
		guildMessageTyping: 1 << 11,

		directMessages: 1 << 12,
		directMessageReaction: 1 << 13,
		directMessageTyping: 1 << 14,
	},
};
