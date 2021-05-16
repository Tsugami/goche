const Message = require('./Message');

module.exports = class MessageReference {
	constructor(
		messageID,
		allowedMentions,
		gocheLibrary,
		guild,
		channelID
	) {
		this.gocheLibrary = gocheLibrary;
		this.guild = guild;
		this.channelID = channelID;
		this.messageID = messageID;
		this.allowedMentions = allowedMentions || {
			users: [],
			parse: [],
		};
	}

	async sendMessage(content) {
		return new Promise.all(resolvePromise => {		
			if (typeof content === 'object') {
				await this.gocheLibrary.requestManager.postRequest(
					`channels/${this.message.channelID}/messages/${this.message.id}`,
					function response(res) {
						const message = new Message(
							res.data,
							guild,
							goche
						);
						message.message_reference =
							res.referenced_message;
						resolvePromise(message);
					},
					content
				);
			} else {
				const goche = this.gocheLibrary;
				const guild = this.guild;
				await this.gocheLibrary.requestManager.postRequest(
					`channels/${this.channelID}/messages`,

					function response(res) {
						const message = new Message(
							res.data,
							guild,
							goche
						);
						message.message_reference =
							res.referenced_message;
						resolvePromise(message);
					},
					{
						content: content,
						allowed_mentions: this
							.mention,
						message_reference: {
							message_id: this
								.messageID,
						},
					}
				);
			}
		})

	}
};
