const MessageQueue = require('../action/message/MessageQueue');
const MessageFlags = require('../tools/MessageFlags');
const Guild = require('./Guild');
const Interaction = require('./Interaction');
const User = require('./User');

const type = {
	0: 'guildText',
	1: 'dm',
	2: 'guildVoice',
	3: 'groupDM',
	4: 'guildCategory',
	5: 'guildNews',
	6: 'guildStore',
	13: 'guildStageVoice',
};




module.exports = class Message {
	constructor(
		message,
		guild = new Guild(),
		gocheLibrary = new GocheLibrary()
	) {

		
		this.gocheLibrary = gocheLibrary;
		this.reactions = [];
		this.guild = guild;
		this.id = message.id;
		this.type = type[message.type] || 'unknown';
		this.isInteraction =
			typeof this.interaction === 'object'
				? true
				: false;
		this.content = message.content || '';
		this.tts = message.tts || false;
		this.timestamp = Date.parse(message.timestamp) || 0;
		this.edited = message.edited_timestamp || 0;
		this.referenced_message = message.referenced_message;
		this.embeds = message.embeds || []
		this.pinned = message.pinned;
		this.nonce = message.nonce === undefined ? null : message.nonce;
		this.mentions = message.mention || [];
		this.mention_roles = message.mention_roles || [];
		this.mention_everyone = message.mention_everyone || [];
		this.member = this.guild.members.get(message.author.id);
		this.flags = new MessageFlags(message.flags);
		this.components = message.components;
		this.channelID = message.channel_id;
		this.channel = this.guild.channels.get(this.channelID);
		this.user = new User(message.author);
		this.attachments = message.attachments;
		this.messageQueue = new MessageQueue(this, gocheLibrary);

		/**
		 * Interaction support for Slash Commands. Using type 20 which is a webhook message.
		 */
		if (this.type === 20) {
			if (typeof this.interaction === 'object') {
				this.interaction = new Interaction(
					message.interaction
				);
			}
		}
	}


	addReaction(emoji) {
		return new Promise(async resolvePromise => {
			await this.gocheLibrary.requestManager.otherRequest(
				'put', 
				`/channels/${this.channel.id}/messages/${this.id}/reactions/${emoji}/@me`, 
				(data) => {
				
					if (data.error === true) {
						resolvePromise(data)
					} else {
						resolvePromise({
							added: true
						})
					}
			}, {

			})
		})
	}


	removeReaction(emoji) {
		return new Promise(async resolvePromise => {
			await this.gocheLibrary.requestManager.otherRequest(
				'delete', 
				`/channels/${this.channel.id}/messages/${this.id}/reactions/${encodeURIComponent(emoji)}/@me`, 
				(data) => {
				
					if (data.error === true) {
						resolvePromise(data)
					} else {
						resolvePromise({
							removed: true
						})
					}
			}, {

			})
		})
	}

	messageReference() {
		return {
			messageReference: class MessageReference {
				constructor(messageID, mention) {
					this.mention;
				}


			},
		};
	}
};
