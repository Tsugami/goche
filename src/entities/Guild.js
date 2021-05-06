const ErrorRequest = require('../action/ErrorRequest')
const AddBanAction = require('../action/guild/AddBanAction')
const CreateChannelAction = require('../action/guild/CreateChannelAction')
const MemberGuildAction = require('../action/guild/MemberGuildAction')
const ModifyChannelAction = require('../action/guild/ModifyChannelAction')
const RoleManagerAction = require('../action/guild/RoleManagerAction')
const MethodAction = require('../action/MethodAction')
const GocheClient = require('../manager/GocheClient')
const BanInfo = require('./BanInfo')
const Member = require('./Member')
const User = require('./User')


module.exports = class Guild {
    constructor(guild, gocheClient = new GocheClient(), shard = 0) {
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
        this.shardID = (this.id % gocheClient.shard)
        this.roles = new Map()
        this.roleManager = new RoleManagerAction(gocheClient, this)
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

    async fetchUser(id) {
        let user
        await this.gocheClient.goche.requestManager.getRequest(`users/${id}`, (data) => {
            if (data.error === true) {
                user = new ErrorRequest(data)
                return
            }
    
            user = new User(data)
        })
        return user
    }


    async fetchBans(id) {
        if (typeof id === 'string') {
            await this.gocheClient.goche.requestManager.getRequest(`guilds/${this.id}/bans`, (data) => {
                if (data.error === true) {
                    user = new ErrorRequest(data)
                    return
                }
                const arrayBan = []
                for (let dataBan of arrayBan) {
                    arrayBan.push(new BanInfo(dataBan))
                }
                return arrayBan
            })
            return
        } else { 
            throw Error('Set the Argument to String (fetchUserBan[Guild])')
        }
        return []
    }


    async fetchUserBan(id) {
        if (typeof id === 'string') {
            let banInf
            await this.gocheClient.goche.requestManager.getRequest(`guilds/${this.id}/bans/${id}`, (data) => {
          
                if (data.error === true) {
                    banInf = data
                } else {
                    const arrayBan = []
                    banInf = new BanInfo(data)
                    return new BanInfo(data)
                }
           
            })
            return banInf
        } else { 
            throw Error('Set the Argument to String (fetchUserBan[Guild])')
        }
        return {
            type: 'http/unknown',
            error: true,
            errorInfo: {
                message: 'It seems that there was a leak of if and that was why there was this return. Don\'t worry, everything is fine. (fetchUserBan[Guild])'
            }
        }
    }

    async ban(member, delDays) {
        if (member instanceof User ) {
            if (member instanceof User) {
                return new AddBanAction(this, member, delDays, this.gocheClient)
            } 
        } else {
            return new AddBanAction(this, null, delDays, this.gocheClient)
        }
    }

    async removeBan(member) {
        let dataBan = null
        if (typeof member === 'string') {
            await this.fetchUserBan(member).then(async e => {
           
                if (e.error === true) {
                    dataBan = e
                    
                } else {
                    dataBan = e
                    await this.gocheClient.goche.requestManager.otherRequest('delete', `guilds/${this.id}/bans/${member}`, async (data) => {

                        if (data.error === true) {
                            dataBan = data
                        }
                    }, {})
                }    
               
                return dataBan
            })
           
            return dataBan
        } else {
            throw Error('Set the Argument to String (removeBan[Guild])')
        }
        return {
            type: 'http/unknown',
            error: true,
            errorInfo: {
                message: 'It seems that there was a leak of if and that was why there was this return. Don\'t worry, everything is fine. (fetchUserBan[Guild])'
            }
        }
    }

    async kick(member) {
        if (typeof member === 'string') {
            const memberGet = this.members.get(member)
            if (typeof memberGet === 'object') {
                this.gocheClient.goche.requestManager.otherRequest('delete', `guilds/${this.id}/members/${memberGet.user.id}`, (data) => {
                    if (data.error === true) {
                        return data
                    }
                    return member 
                })
                return
            } else {
                return {
                    type: 'unknown/member',
                    error: true
                }
            }
            return
        } else {
            return {
                type: 'unknown/output',
                error: true
            }
        }
    
    }


    async selfSetNick(nickname, reason = '') {
        let selfSetNickClass = class SelfSetNick {
            constructor(nickname) {
                this.nick = nickname.nick
                this.reason = nickname.reason
            }
        }
        await this.gocheClient.goche.requestManager.otherRequest('patch', `guilds/${this.id}/members/@me/nick`, (data) => {
            if (data.error === true) {
                return new ErrorRequest(data)
            }
            return new selfSetNickClass(data)
        }, {
            nick: nickname,
            reason: reason
        })

        return new selfSetNickClass({
            nick: nickname,
            reason: reason
        })
    }


    createChannel() {
        return new CreateChannelAction(this.gocheClient, this)
    }

    editTextChannel() {
        return new ModifyChannelAction(this.gocheClient, this)
    }


    modifyMember(id) {
        if (typeof id === 'string') {
            const member = this.members.get(id)
            if (typeof member === 'object') {
                return new MemberGuildAction(this.gocheClient, this, member)
            } 
        } else {
            throw Error('Set the Argument to String (modifyMember[Guild])')
        }
    }
    
}