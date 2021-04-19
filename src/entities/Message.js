const MessageQueue = require('../action/message/MessageQueue')
const User = require('./User')

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

module.exports = class Message {
    constructor(message, guild, gocheLibrary = new GocheLibrary()) {
  
        this.gocheLibrary = gocheLibrary
        this.guild = guild
        this.id = message.id
        this.type = type[message.type] || 'unknown'
        this.content = message.content || ''
        this.tts = message.tts || false
        this.timestamp = Date.parse(message.timestamp) || 0
        this.referenced_message = message.referenced_message
        this.pinned = message.pinned
        this.nonce = message.nonce
        this.mentions = message.mention || []
        this.mention_roles = message.mention_roles || []
        this.mention_everyone = message.mention_everyone || []
        this.member = message.member
        this.flags = message.flags
        this.components = message.components
        this.channelID = message.channel_id
        this.channel = this.guild.channels.get(this.channelID)
        this.user = new User(message.author)
        this.attachments = message.attachments
        this.messageQueue = new MessageQueue(this)
    }
}