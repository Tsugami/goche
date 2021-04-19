const GocheLibrary = require('../GocheLibrary')


module.exports = class ShardingController {
    constructor(gocheLibrary = new GocheLibrary()) {
        this.shards = new Map()
        this.gocheLibrary = gocheLibrary
    }
}