


module.exports = class Application {
    constructor(application) {
        this.id = application.id || ''
        this.flags = application.flags  || 0
    }
}