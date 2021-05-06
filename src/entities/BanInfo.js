const User = require("./User")



module.exports = class BanInfo {
    constructor(data) {
        this.reason = data.reason
        this.user = new User(data.user)
    }
}