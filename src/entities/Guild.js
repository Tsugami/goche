const AddBanAction = require("../action/guild/AddBanAction")
const Member = require("./Member")


module.exports = class Guild {
    constructor(guild, gocheClient) {
        this.id = guild.id || ''
        this.name = guild.name || ''
        this.description = guild.description || ''
        this.icon = guild.icon || ''
        this.splash = guild.splash || ''
        this.discoverySplash = guild.discovery_splash || ''
        this.owner = guild.owner || ''
        this.ownerID = guild.owner_id || ''
        this.afkChannelID = guild.afk_channel_id || ''
        this.afkTimeout = guild.afk_timeout || ''
        this.verificationLevel = guild.verification_level || 0
        this.explicitContentFilter = guild.explicit_content_filter || 0
        this.features = guild.features || []
        this.joinedAt = Date.parse(guild.joined_at) || 0
        this.large = guild.large
        this.unavailable = guild.unavailable
        this.membersCount = guild.member_count
        this.voiceStates = guild.voice_states
        this.roles = new Map()
        this.emojis = new Map()
        this.members = new Map()
        this.channels = new Map()
        this.category = new Map()
        this.voiceChannels = new Map()
        this.presences = guild.presences
        this.maxMembers = guild.max_members
        this.vanityURL = guild.vanity_url_code || ''
        this.gocheClient = gocheClient
        this.banner = guild.banner || ''
        this.premiumTier = guild.premium_tier
        this.premiumSubscriptionCount = guild.premium_subscription_count
        this.preferredLocale = guild.preferred_locale
        this.publicUpdatesChannelID = guild.public_updates_channel_id || ''
        this.maxVideoChannelUsers = guild.max_video_channel_users
        this.welcomeScreen = ''
    }


    ban(member, delDays) {
        if (member instanceof Member) {
            return new AddBanAction(this, member.user, delDays)
        } else {
            if (typeof member === 'undefined' && member === null) {
                Error("Member return is null")
                return
            }
            return new AddBanAction(this.getUserByID(member), member.user, delDays)
        }
    }

    kick(member) {
        if (member instanceof Member) {
            return new AddBanAction(this, member.user, delDays, this.gocheClient)
        } else {
            if (typeof member === 'undefined' && member === null) {
                Error("Member return is null")
                return
            }
            return new AddBanAction(this.getUserByID(member), member.user, delDays, this.gocheClient)
        }
    }
    
}