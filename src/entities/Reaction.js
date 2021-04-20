const Emoji = require('./Emoji')
const Member = require('./Member')



module.exports = class Reaction {
    constructor(reaction) {
        this.type = 'reaction'
        this.guildID = reaction.guild_id
        this.messageID = reaction.message_id
        this.userID = reaction.user_id
        this.member = new Member(reaction.member)
        this.emoji = new Emoji(reaction.emoji)
    }
}