const Guild = require("../../entities/Guild")
const GocheClient = require("../../manager/GocheClient")


module.exports = class CreateChannelAction {
    constructor(gocheClient = new GocheClient(), guild = new Guild()) {
        this.gocheClient = gocheClient
        this.guild = guild
        this.data = {   

        }
    }

    setName(name) {
        this.data.name = name
        return this
    }

    setType(type) {
        this.data.type = type
        return this
    }


    setTopic(topic) {
        this.data.topic = topic
        return this
    }

    setUserLimit(user_limit) {
        this.data.user_limit = user_limit
        return this
    }

    setRateLimitPerUser(rate_limit_per_user) {
        this.data.rate_limit_per_user = rate_limit_per_user
        return this
    }


    setPosition(position) {
        this.data.position = position
        return this
    }


    setPermissionOverwrites(permission_overwrites) {
        this.data.permission_overwrites = permission_overwrites
        return this
    }

    parentId(parent_id) {
        this.data.parent_id = parent_id
        return this
    }

    setNSFW(nsfw) {
        this.data.nsfw = nsfw
        return this
    }

    async done() {
        await this.gocheClient.goche.requestManager.postRequest(`guilds/${this.guild.id}/channels`, (data) => {
            if (data.error === true) {
                return data
            }
            return this.guild.channels.get(data.id)
        }, this.data)
        return {
            type: 'http/slow',
            error: true,
            errorInfo: {
                message: 'Probably the request was not made'
            }
        }
    }
}