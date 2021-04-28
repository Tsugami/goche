const Application = require('./Application')
const User = require('./User')




module.exports = class SelfUser {
    constructor(self) {
        this.user = new User(self.user)
        this.application = new Application(self.application)
        this.sessionID = self.session_id || ''
        this.rtc_regions = self.geo_ordered_rtc_regions || []
    }
}