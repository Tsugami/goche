const Guild = require("./Guild")



module.exports = class Role {
    constructor(role, guild = new Guild()) {
        this.type = 'role'
        this.name = role.name
        this.isMentionable = role.mentionable
        this.managed = role.managed
        this.hoist = role.hoist
        this.color = role.color
        this.guild = guild
    }
}