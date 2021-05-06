const Guild = require("../../entities/Guild")
const User = require("../../entities/User")
const GocheClient = require("../../manager/GocheClient")
const ErrorRequest = require("../ErrorRequest")


module.exports = class AddBanAction {
    constructor(guild = new Guild(), user , delDays = 0, gocheClient) {
        this.guild = guild
        this.gocheClient = gocheClient
        this.user = user
        this.reason = ''
        this.deleteMessageDays = delDays
        this.time = Date.now()
    }

    /**
     * 
     * @param {*} reason 
     * @example
     * guild.ban('Member or ID, tag', 7).reason('Testing').done()
     */
    setReason(reason) {
        this.reason = reason
        return this
    }

    /**
     * The class will create a request in the Discord API to punish server users.
     */
    async done() {
        if (this.user === null) {
            return Error('You need to inform User to ban.')
        }
        const classBan = class BanInfo {
            constructor(data) {
                if (data === null) {
                    return
                }
                this.user = data.user
                this.reason = data.reason
                this.time = data.time
            }
        }
        let dataDone = new classBan(null)
        await this.gocheClient.goche.requestManager.otherRequest('put', `guilds/${this.guild.id}/bans/${this.user.id}`, async (data) =>{

            if (data.error === true) {

                dataDone = data
                return 
            }

            dataDone = await new classBan({
                user: this.user,
                reason: this.reason,
                time: this.time
            })
       
        }, {
            delete_message_days: this.deleteMessageDays,
            reason: this.reason
        })
        return dataDone
    }
    


}