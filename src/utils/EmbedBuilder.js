module.exports = class EmbedBuilder {
    constructor() {
        this.embed = {
            fields: []
        }
    }

    title(title) {
        this.embed.title = title
        return this
    }

    description(description) {
        this.embed.description = description
        return this
    }

    url(url) {
        this.embed.url = url
        return this
    }

    timestamp(timestamp) {
        this.embed.timestamp = timestamp
        return this
    }

    color(color) {
        this.embed.color = color
    }

    author(author) {
        this.embed.author = author
    }

    field(name, value, inline) {
        this.embed.fields.push({
            name: name,
            value: value,
            inline: inline
        })
        return this
    }

    data(data) {
        this.embed = {} // reset data
        this.embed = data
        return this
    }

    builder() {
        return this.embed
    }
}