const { on } = require('events');
const Channel = require('./Channel');
const Message = require('./Message');

module.exports = class TextChannel extends Channel {
    constructor(channel, guild, gocheLibrary) {
        super(channel, guild, gocheLibrary)
    }
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
		return new Promise(async resolvePromise => {
			if (typeof content === 'object') {
				const goche = this.gocheLibrary;
				const guild = this.guild;
				await this.gocheLibrary.requestManager.postRequest(
					`channels/${this.id}/messages`,
					async function (res) {
						if (res.data.error === true) {
							resolvePromise(res)
						} else {
							res.guild = guild;
							const message = new Message(
								res,
								guild,
								goche
							);
							resolvePromise(message)
						
						}
					},
					content
				);
			} else {
				if (content.length > 2000) {
					throw Error(`Maximum letters are 2000. There are {${content.length}} letters`)
				}
				if (content.length >= 0 && content.length === ' ') {
					throw Error('That message is empty')
				}
				const goche = this.gocheLibrary;
				const guild = this.guild;
				this.gocheLibrary.requestManager.postRequest(
					`channels/${this.id}/messages`,
					async (res) => {
					
						 res.guild = guild;

						if (res.error === true) {
							resolvePromise(res)
						} else {
							res.guild = guild;
							const message = new Message(
								res,
								guild,
								goche
							);
							resolvePromise(message)
						}
					},
					{
						content: content,
					}
				);
			}
		})
	}

	
};
