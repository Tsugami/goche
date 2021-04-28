const CommandArgs = require('./CommandArgs')



module.exports = class CommandInteraction {
    constructor(command) {
        this.haveOptions = typeof command.options === 'undefined' ? false : true
        this.name = command.name
        this.id = command.id
        this.options = new Array()
        this.noArgs = false
        if (this.haveOptions === true) {
            if (command.options >= 0) {
                this.noArgs = true
            } else {
                command.options.map(e => {
                    this.options.push(new CommandArgs(e))
                })
            }
          
        } else {
            this.noArgs = false
        }
    }
}
