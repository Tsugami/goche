


/**
 * @deprecated
 * There will be no more implementations until you set up the ShardManager 
 */
module.exports = class CacheManager {
    constructor() {
        this.changesObject = 0
        this.changesRevoked = 0

        this.eventsDisabled = []
        this.eventsStuck = 0


        this.serversUpdated = 0
        this.usersUpdated = 0
        this.messageUpdated = 0
        this.messageRemoved = 0


        this.cacheRemoved = 0
        this.cacheFailed = 0
        this.cacheCritical = 0
        this.newCache = 0
        this.oldCache = 0
        this.cacheChanged = 0
        this.cacheAbuse = 0
        this.cacheCrusched = 0
        

        this.methodUsed = 0
        this.requestCreated = 0
       
        this.queueRateLimit = []
     


    }
}