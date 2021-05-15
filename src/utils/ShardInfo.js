


module.exports = class ShardInfo {
    constructor(shardID, websocketManager) {
        this.shardID = shardID
        this.wsManager = websocketManager
        this.failed = 0
        this.ready = false
        this.connected = 0
        this.destroy = 0
        /**
         *  
         * **NO_REPLY** = When there is no response from Shard
         *
         * **STARTING_SHARD** = Starting Shard to prepare another Shard
         * 
         * **FAILURE** = There was an error in the code that may have caused this problem!
         * 
         * **OUT_OF_TIME** = When the connection is open for a long time, sometimes when there are no events the connection is automatically closed!
         * 
         * **IGNORED_SHARD** = The shard has been ignored by some function or executed by eval.
         * 
         * **FAILED_TO_CONNECT** = Failed to connect
         * 
         * **PREPARING_THE_SHARD** = The shard is being prepared to connect and ready to receive events.
         * 
         * **IDENTIFYING** = Identifying Shard
         * 
         * **RECONNECTING** = The shard is reconnecting
         * 
         * **CLOSED** = The connection has been closed
         * 
         * **VALUE_OF_INTENT_IS_VALID** = When the value of intent is invalid.
         * 
         * **OK** = It looks like Shard is working well.
         */
        this.status = 'STARTING_SHARD'

    }
}