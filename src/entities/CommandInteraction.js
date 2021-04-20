const CommandArgs = require('./CommandArgs')



module.exports = class CommandInteraction {
    constructor(command) {
        this.name = command.name
        this.id = command.id
        this.options = new Array()
        this.noArgs = false
        if (command.options >= 0) {
            command.options.map(e => {
                this.options.push(new CommandArgs(e))
            })
        } else {
            this.noArgs = true
        }
    }
}