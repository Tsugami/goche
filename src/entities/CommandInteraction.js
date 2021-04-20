const CommandArgs = require('./CommandArgs')



module.exports = class CommandInteraction {
    constructor(command) {
        this.name = command.data.name
        this.id = command.data.id
        this.options = new Array()
        this.noArgs = false
        if (command.data.options.length >= 0) {
            command.data.options.map(e => {
                this.options.push(new CommandArgs(e))
            })
        } else {
            this.noArgs = true
        }
    }
}
