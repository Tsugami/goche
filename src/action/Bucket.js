

module.exports = class Bucket {
    constructor(path, method) {
        this.path = path || ''
        this.requests = [];
        this.method = method || null
        this.stuck = false
    }

    setStuck() {
        this.stuck = true
    }
}