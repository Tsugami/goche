




module.exports = class User {
    constructor(user) {
        this.type = user.bot === true ? 'user' : 'bot'
        this.username = user.username || ''
        this.discriminator = user.discriminator  || ''
        this.id = user.id || ''
        this.flags = user.flags || 0
        this.isBot = user.bot || false
        this.avatar = user.avatar || ''
        this.mention = `<@!${user.id}>` || ''
        this.tag = `${user.username}#${user.discriminator}` || ''
        this.isCache = false
        this.deletedCache = false
    } 

    /**
     * 
     */
    deleteFromCache() {
        
    }
}