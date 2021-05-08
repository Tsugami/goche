const GocheLibrary = require('../../GocheLibrary');
const SlashInteraction = require('../../utils/SlashInteraction');

module.exports = class SlashManager {
	constructor(gocheLibrary = new GocheLibrary()) {
		this.gocheLibrary = gocheLibrary;
		this.commands = new Map();
	}
	/**
	 *
	 * @param {*} command
	 * @class SlashInteraction Use the class to build SlashCommand
	 */
	addCommand(command = new SlashInteraction()) {
		this.commands.set(command.name, command);
		return this;
	}

	/**
	 *
	 * @returns The library will update/create the commands in the Discord API
	 */
	async build() {
		for (let command of this.commands) {
			let commandSlash = this.commands.get(command);

			await this.gocheLibrary.requestManager.postRequest(
				`applications/${this.gocheLibrary.client.selfUser.user.id}/commands`,
				function data(res) {},
				commandSlash
			);
		}
		return this;
	}
};
