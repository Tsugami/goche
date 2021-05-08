module.exports = class CommandArgs {
	constructor(command) {
		this.name = command.name;
		this.value = command.value;
	}
};
