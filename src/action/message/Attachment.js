


module.exports = class Attachment {
    constructor(filename = 'unknown', attachment) {
        this.id = attachment.id
        this.filename = filename
        this.content_type = attachment.content_type
        this.size = attachment.size
        this.url = attachment.url
        this.proxyUrl = attachment.proxyUrl
        this.height = attachment.height
        this.width = attachment.width
    }
}