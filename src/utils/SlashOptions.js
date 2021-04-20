


module.exports = class SlashOptions {
    constructor() {
        this.name = ''
        this.description = ''
        this.type = 3
        this.required = ''
        this.choices = new Array()
    }


    setName(title) {
        this.name = title
        return this
    }

    setDescription(description) {
        this.description = description
        return this
    }

    setType(number) {
        this.type = number
        return this
    }

    addChoices(choice) {
        this.choices.push(choice)
        return this
    }
}