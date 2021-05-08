module.exports = class SlashInteraction {
	constructor() {
		this.name = 'nameOfCommand';
		this.description = '';
		this.options = new Array();
	}

	commandName(name) {
		this.name = name;
		return this;
	}

	description(description) {
		this.description = description;
		return this;
	}

	addArgs(commandOptions) {
		this.options.push(commandOptions);
		return this;
	}
};
