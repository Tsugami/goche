const Guild = require('../../entities/Guild');
const Role = require('../../entities/Role');
const GocheClient = require('../../manager/GocheClient');
const Color = require('../../tools/Color');

module.exports = class RoleCreateAction {
	constructor(gocheClient = new GocheClient(), guild = new Guild()) {
		this.gocheClient = gocheClient;
		this.guild = guild;
		this.data = {};
	}

	setName(name) {
		if (typeof name === 'string') {
			this.data.name = name;
		} else {
			throw Error(
				'You need to insert a String in the Argument (setName[RoleCreateAction])'
			);
		}
		return this;
	}

	setPermissions(permissions = 0) {
		if (typeof permissions === 'number') {
			this.data.permissions = permissions;
		} else {
			throw Error(
				'You need to insert a Bit (Number) in the Argument (setPermissions[RoleCreateAction])'
			);
		}
		return this;
	}

	setColor(color = 0) {
		const conversion = new Color().ToNumber(color);
		if (conversion.error === 'true') {
			throw Error('There was a problem making a cover');
		} else {
			this.data.color = conversion.color;
		}
		return this;
	}

	setHoist(hoist) {
		if (typeof hoist === 'boolean') {
			this.data.hoist = hoist;
		} else {
			throw Error(
				'You need to insert a Boolean in the Argument (setHoist[RoleCreateAction])'
			);
		}
		return this;
	}

	setMentionable(mentionable) {
		if (typeof mentionable === 'boolean') {
			this.data.mentionable = mentionable;
		} else {
			throw Error(
				'You need to insert a Boolean in the Argument (setMentionable[RoleCreateAction])'
			);
		}
		return this;
	}

	async done() {
		let dataRole;
		let yes;
		if (typeof this.data.name === 'string') {
			yes = true;
		} else {
			return {
				type: 'roleCreateAction/name',
				error: true,
				errorInfo: {
					message:
						'Enter a name for this role to create it (done[RoleCreateAction])',
				},
			};
		}
		await this.gocheClient.goche.requestManager.postRequest(
			`guilds/${this.guild.id}/roles`,
			async (data) => {
				if (data.error === true) {
					dataRole = data;
				} else {
					dataRole = new Role(
						data,
						this.guild
					);
				}
			},
			this.data
		);

		return dataRole;
	}
};
