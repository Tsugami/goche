const Role = require("../../entities/Role")
const Color = require("../../tools/Color")



module.exports = class ModifyRoleAction {
    constructor(gocheClient = new GocheClient(), guild = new Guild(), role = new Role()) {
        this.gocheClient = gocheClient
        this.guild = guild
        this.role = role
        this.data = {

        }
    }

    setName(name) {
        if (typeof name === 'string') {
            this.data.name = name
        } else {
            Error('You need to insert a String in the Argument (setName[RoleCreateAction])')
        }
        return this
    }

    setPermissions(permissions = 0) {
        if (typeof permissions === 'number') {
            this.data.permissions = permissions
        } else {
            Error('You need to insert a Bit (Number) in the Argument (setPermissions[RoleCreateAction])')
        }
        return this
    }

    setColor(color = 0) {
        const conversion = new Color().ToNumber(color)
        if (conversion.error === 'true') {
            Error('There was a problem making a cover')
        } else {
            this.data.color = conversion.color
        }
       
        return this
    }

    setHoist(hoist) {
        if (typeof hoist === 'boolean') {
            this.data.hoist = hoist
        } else {
            Error('You need to insert a Boolean in the Argument (setHoist[RoleCreateAction])')
        }
        return this
    }

    setMentionable(mentionable) {
        if (typeof mentionable === 'boolean') {
            this.data.mentionable = mentionable
        } else {
            Error('You need to insert a Boolean in the Argument (setMentionable[RoleCreateAction])')
        }
        return this
    }

    async done() {
        let dataRole
    
        await this.gocheClient.goche.requestManager.otherRequest('patch', `guilds/${this.guild.id}/roles/${this.role.id}`, async (data) => {
            if (data.error === true) {
                dataRole = data
            } else {
                dataRole = new Role(data, this.guild)
            }
        
        }, this.data)
        
        return dataRole
    }
}