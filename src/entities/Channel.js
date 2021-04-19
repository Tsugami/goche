const GocheLibrary = require('../GocheLibrary')
const Message = require('./Message')
const MessageReference = require('./MessageReference')


const type = {
    0: 'guildText',
    1: 'dm',
    2: 'guildVoice',
    3: 'groupDM',
    4: 'guildCategory',
    5: 'guildNews',
    6: 'guildStore',
    13: 'guildStageVoice'
}


module.exports = class Channel {
    constructor(channel, guild, gocheLibrary = new GocheLibrary()) {
        this.type = 'channel'
        this.guild = guild
        this.gocheLibrary = gocheLibrary
        this.channel = channel
        this.id = channel.id
        this.type = type[this.channel.type]
        this.position = this.channel.position
        this.permissionOverwrites = this.channel.permission_overwrites
        this.name = this.channel.name
        this.topic = this.channel.topic || ''
        this.nsfw = this.channel.nsfw === undefined ? false : this.channel.nsfw
        this.lastMessageID = this.channel.last_message_id
        
    
    }
    /**
     * 
     * @param {*} messageID Mention the message ID
     * @param {*} allowedMentions  A function that allows you to mention or mention a certain user
     * @returns 
     */
    messageReference(messageID, allowedMentions) {
        return new MessageReference(messageID, allowedMentions, this.gocheLibrary, this.guild, this.id)
    }

    async sendMessage(content) {
        let dataMessage = {}
        if (typeof content === 'object') {
            
        } else {
            const goche = this.gocheLibrary
            const guild = this.guild
            await this.gocheLibrary.requestManager.postRequest(`channels/${this.id}/messages`, async function(res) {
               res.data.guild = guild
               
                const message = new Message(res.data, guild, goche)
                dataMessage = message
            
            }, {
                content: content
            })
        }
    
        return dataMessage
    }

}