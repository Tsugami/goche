const ShardInfo = require("./ShardInfo")

module.exports = class ShardInfoManager {
    constructor() {
        this.shardsMap = new Map()
        this.shardsArray = new Array()
    }

    create(id, shardInfo = new ShardInfo()) {
        this.shardsArray.push(shardInfo)
        this.shardsMap.set(id, shardInfo)
        return shardInfo
    }
}