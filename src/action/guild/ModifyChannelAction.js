const Guild = require('../../entities/Guild');
const GocheClient = require('../../manager/GocheClient');

module.exports = class ModifyChannelAction {
	constructor(gocheClient = new GocheClient(), guild = new Guild()) {
		this.gocheClient = gocheClient;
		this.guild = guild;
		this.data = {};
	}

	setID(id) {
		this.data.id = id;
		return this;
	}

	setPosition(position) {
		this.data.position = position;
		return this;
	}

	setLockPermissions(lock_permissions) {
		this.data.lock_permissions = lock_permissions;
		return this;
	}

	setParentId(parent_id) {
		this.data.parent_id = parent_id;
		return this;
	}

	async done() {
		return new Promise(promiseResolve => {
			this.gocheClient.goche.requestManager.otherRequest(
				'patch',
				`guilds/${this.guild.id}/channels`,
				(data) => {
					if (data.error === true) {
						throw Error(data);
					} else {
						promiseResolve(this.guild.channels.get(
							data.id
						));
						
					}
	
					
				},
				this.data
			);
		})
	}
};
