

module.exports = class ReactionRemoveEvent {
    constructor(reaction, guild) {
        this.userID = reaction.user_id;
        this.messageID = reaction.message_id;
        this.emoji = reaction.emoji;
        this.channelID = reaction.channel_id;
        if (typeof guild === 'undefined') {
            this.guild = reaction.guild_id;
        } else {
            this.guild = guild;
        }
    }
}