const Guild = require("./Guild")


module.exports = class GuildPreview {
    constructor(data, guild) {
        this.id = data.id
        this.guild = guild
        this.name = data.name
        this.icon = data.icon
        this.splash = data.splash
        this.discoverySplash = data.discovery_splash
        this.emojis = []
        this.features = []
        this.approximateMemberCount = data.approximate_member_count
        this.approximatePresenceCount = data.approximate_presence_count
        this.description = data.description  
    }
}