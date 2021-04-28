const GocheLibrary = require("../GocheLibrary")
const Guild = require("./Guild")
const User = require("./User")

module.exports = class Presence {
    constructor(user, data, gocheLibrary = new GocheLibrary()) {
        this.gocheLibrary = gocheLibrary
        this.user = new User(user)
        this.guild = this.gocheLibrary.client.guilds.get(data.guild_id)
        this.status = data.status
    }
}