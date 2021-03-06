const Message = require('../../entities/Message');
const UpdateObject = require('../../tools/UpdateObject');

module.exports = class MessageQueue {
	/**
	 *
	 * @description This class will improve in the search for methods and also to facilitate the use of requests and to organize the code.
	 */
	constructor(message = new Message(), gocheLibrary) {
		this.message = message;
		this.gocheLibrary = gocheLibrary;
	}

	/**
	 *
	 * @returns This action can remove messages from the text channel. Remembering that this type of action can return another type of error. When there is no permission needed on the voice channel!
	 */
	async deleteMessage(time) {
		const messageQueue = this
		return new Promise(async resolvePromise => {
			
			if (typeof time === 'number') {
				setTimeout(async () => {
					await this.gocheLibrary.requestManager.otherRequest(
						'delete',
						`channels/${this.message.channelID}/messages/${this.message.id}`,
						(data) => {
							if (data.error === true) {
								resolvePromise(data)
							} else {   
								resolvePromise(messageQueue.message)
							}
						}
					);
				}, time)
			} else {
				await this.gocheLibrary.requestManager.otherRequest(
					'delete',
					`channels/${this.message.channelID}/messages/${this.message.id}`,
					(data) => {
						if (data.error === true) {
							resolvePromise(data)
						} else {   
							resolvePromise(messageQueue.message)
						}
					}
				);
			}
			
		})
	}

	/**
	 * @description Create a message in the text channel.
	 * @param {*} content
	 * @example
	 * ```
	 * channel.sendMessage('Hello').messageQueue.editMessage('test')
	 * ```
	 */
	editMessage(content) {
		return new Promise(async resolvePromise => {
			if (typeof content === 'object') {
				await this.message.gocheLibrary.requestManager.otherRequest(
					'patch',
					`channels/${this.message.channelID}/messages/${this.message.id}`,
					(res) => {
			
						if (res.error === true) {
							resolvePromise(res)
						} else {
							new UpdateObject(res, this.message, [
								'content',
								'pinned',
								'mention_everyone',
								'tts'
							]).letGo()
							this.message.edited = Date.parse(res.edited_timestamp)
							this.message.embeds.map(e => this.message.embeds.pop())
							res.embeds.map(e => {
								e.push(e)
							})
							resolvePromise(res)
						}
					},
					{
						content: content,
					}
				);
				;
			} else {
				await this.message.gocheLibrary.requestManager.otherRequest(
					'patch',
					`channels/${this.message.channelID}/messages/${this.message.id}`,
					(res) => {
		
						if (res.error === true) {
							resolvePromise(res)
						} else {
							new UpdateObject(res, this.message, [
								'content',
								'pinned',
								'mention_everyone',
								'tts'
							]).letGo()
							this.message.edited = Date.parse(res.edited_timestamp)
							this.message.embeds.map(e => this.message.embeds.pop())
							res.embeds.map(e => {
								e.push(e)
							})
							resolvePromise(this.message)
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
