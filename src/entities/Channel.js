const ModifyChannelAction = require('../action/guild/ModifyChannelAction');
const GocheLibrary = require('../GocheLibrary');
const type = {
	0: 'guildText',
	1: 'dm',
	2: 'guildVoice',
	3: 'groupDM',
	4: 'guildCategory',
	5: 'guildNews',
	6: 'guildStore',
	10: 'guildNewsThread',
	11: 'guildPublicThread',
	12: 'guildPrivateThread',
	13: 'guildStageVoice',
};

module.exports = class Channel {
	constructor(channel, guild, gocheLibrary) {
		this.type = type[channel.type];
		this.guild = guild;
		this.gocheLibrary = gocheLibrary;
		this.channel = channel;
		this.id = channel.id;
		this.position = this.channel.position;
		this.permissionOverwrites = this.channel.permission_overwrites;
		this.name = this.channel.name;
		this.topic = this.channel.topic || '';
		this.nsfw =
			this.channel.nsfw === undefined
				? false
				: this.channel.nsfw;
		this.lastMessageID = this.channel.last_message_id;
		this.messagesQueue = new Map();
	}

	async modifyChannel() {
		const modify = new ModifyChannelAction(
			this.guild.gocheClient,
			this.guild
		);
		modify.data.type = this.type;
		return modify;
	}

	async delete() {
		let dataMessage = null;
		await this.gocheLibrary.requestManager.otherRequest(
			'delete',
			`channels/${this.id}/messages`,
			async (res) => {
				
				res.guild = guild;
				if (res.error === true) {
					dataMessage = res;
				} else {
					dataMessage = this;
				}
			}
		);
		return dataMessage;
	}
};
