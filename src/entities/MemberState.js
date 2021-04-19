const Member = require("./Member")
const VoiceChannel = require("./VoiceChannel")



module.exports = class MemberState {
    constructor(user, voice, guild) {
 
        this.member = new Member(user)
        this.channel = new VoiceChannel(voice, guild)
        this.connected = false
        this.joined = Date.now()
        this.leaved = 0
    }
}