const Message = require('../../entities/Message');

module.exports = class MessageQueue {
	/**
	 *
	 * @description This class will improve in the search for methods and also to facilitate the use of requests and to organize the code.
	 */
	constructor(message = new Message()) {
		this.message = message;
	}

	/**
	 *
	 * @returns This action can remove messages from the text channel. Remembering that this type of action can return another type of error. When there is no permission needed on the voice channel!
	 */
	delete() {
		this.message.gocheLibrary.requestManager.otherRequest(
			'delete',
			`channels/${this.message.channelID}/messages/${this.message.id}`,
			function response(data) {}
		);
	}

	/**
	 * @description Create a message in the text channel.
	 * @param {*} content
	 * @example
	 * ```
	 * channel.sendMessage('Hello').messageQueue.edit('test')
	 * ```
	 */
	async edit(content) {
		let data = {};

		if (typeof content === 'object') {
			await this.message.gocheLibrary.requestManager.otherRequest(
				'patch',
				`channels/${this.message.channelID}/messages/${this.message.id}`,
				function response(res) {},
				{
					content: content,
				}
			);
			this.message = content;
		} else {
			await this.message.gocheLibrary.requestManager.otherRequest(
				'patch',
				`channels/${this.message.channelID}/messages/${this.message.id}`,
				function response(res) {},
				{
					content: content,
				}
			);
			this.message = content;
		}

		return this.message;
	}

	/**
	 * @description Method was created to delete message
	 * @param {*} time
	 * @example
	 * ```
	 * channel.sendMessage('Hello').messageQueue.delete()
	 * ```
	 */
	async delete(time) {}

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
