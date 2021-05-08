const Channel = require('./Channel');

module.exports = class TextChannel extends Channel {
	/**
	 *
	 * @param {*} messageID Mention the message ID
	 * @param {*} allowedMentions  A function that allows you to mention or mention a certain user
	 * @example
	 * ```
	 *
	 * channel.messageReference(messageID, {
	 *  parses: ["users", "roles"],
	 *  users: []
	 * }).sendMessage('Hello')
	 *
	 * ```
	 */
	messageReference(messageID, allowedMentions) {
		return new MessageReference(
			messageID,
			allowedMentions,
			this.gocheLibrary,
			this.guild,
			this.id
		);
	}

	/**
	 * @description Create a message in the text channel.
	 * @param {*} content
	 * @example
	 * ```
	 * channel.sendMessage('Hello')
	 * ```
	 */
	async sendMessage(content) {
		let dataMessage = {};
		if (typeof content === 'object') {
			const goche = this.gocheLibrary;
			const guild = this.guild;
			await this.gocheLibrary.requestManager.postRequest(
				`channels/${this.id}/messages`,
				async function (res) {
					res.guild = guild;

					if (res.error === true) {
						dataMessage = res;
					} else {
						const message = new Message(
							res.data,
							guild,
							goche
						);
						dataMessage = message;
					}
				},
				content
			);
		} else {
			const goche = this.gocheLibrary;
			const guild = this.guild;
			await this.gocheLibrary.requestManager.postRequest(
				`channels/${this.id}/messages`,
				async function (res) {
					res.guild = guild;
					if (res.error === true) {
						dataMessage = res;
					} else {
						const message = new Message(
							res,
							guild,
							goche
						);
						dataMessage = message;
					}
				},
				{
					content: content,
				}
			);
		}
		return dataMessage;
	}
};
