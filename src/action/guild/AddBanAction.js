const Guild = require("../../entities/Guild")
const User = require("../../entities/User")
const GocheClient = require("../../manager/GocheClient")


module.exports = class AddBanAction {
    constructor(guild = new Guild(), user = new User(), delDays = 0, gocheClient = new GocheClient) {
        this.guild = guild
        this.user = user
        this.reason = reason
        this.delete_message_days = delDays
    }

    /**
     * 
     * @param {*} reason 
     * @example
     * guild.ban('Member or ID, tag', 7).reason('Testing').done()
     */
    reason(reason) {
        this.reason = reason
        return this.user;
        
    }

    /**
     * The class will create a request in the Discord API to punish server users.
     */
    done() {
        
    }


}