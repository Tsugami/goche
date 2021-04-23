const Message = require('../../entities/Message');




module.exports = class MessageQueue {
    constructor(message = new Message()) {
        this.message = message
    }

    /**
     * 
     * @returns This action can remove messages from the text channel. Remembering that this type of action can return another type of error. When there is no permission needed on the voice channel!
     */
    delete() {
        this.message.gocheLibrary.requestManager.otherRequest('delete', `channels/${this.message.channelID}/messages/${this.message.id}`, function response(data) {
          
        })
    }

    /**
     * 
     * @returns This action may contain errors if the text channel is closed or you are not allowed to type!
     */
    async edit(content) {
        let data = {    }
      
        if (typeof content === 'object') {
            await this.message.gocheLibrary.requestManager.otherRequest(
                'patch', 
                `channels/${this.message.channelID}/messages/${this.message.id}`, 
                function response(res) {}, {
                    content: content
                }
            )
            this.message = content
        } else {
            
           
            await this.message.gocheLibrary.requestManager.otherRequest(
                'patch', 
                `channels/${this.message.channelID}/messages/${this.message.id}`, 
                function response(res) {}, {
                    content: content
                }
            )
            this.message = content
        
        }

         
        return this.message
    }

    messageReference() {
        return {
            messageReference: class MessageReference {
                constructor(messageID, mention) {
                    this.mention
                }

            }
        }
    }
}