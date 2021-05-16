const Guild = require('../../entities/Guild');
const GocheClient = require('../../manager/GocheClient');

module.exports = class CreateChannelAction {
	constructor(gocheClient = new GocheClient(), guild = new Guild()) {
		this.gocheClient = gocheClient;
		this.guild = guild;
		this.data = {};
	}

	setName(name) {
		if (typeof name === 'string') {
			this.data.name = name;
		} else {
			Error(
				'You need to put a string for argument (setName[CreateChannelAction])'
			);
		}
		return this;
	}

	setType(type) {
		if (typeof type === 'number') {
			this.data.type = type;
		} else {
			Error(
				'You need to put a number for argument (setType[CreateChannelAction])'
			);
		}
		return this;
	}

	setTopic(topic) {
		if (typeof topic === 'string') {
			this.data.topic = topic;
		} else {
			Error(
				'You need to put a string for argument (setTopic[CreateChannelAction])'
			);
		}

		return this;
	}

	setUserLimit(user_limit) {
		if (typeof user_limit === 'number') {
			this.data.user_limit = user_limit;
		} else {
			Error(
				'You need to put a number for argument (setUserLimit[CreateChannelAction])'
			);
		}
		return this;
	}

	setRateLimitPerUser(rate_limit_per_user) {
		if (typeof rate_limit_per_user === 'number') {
			this.data.rate_limit_per_user = rate_limit_per_user;
		} else {
			Error(
				'You need to put a number for argument (setRateLimitPerUser[CreateChannelAction])'
			);
		}
		return this;
	}

	setPosition(position) {
		if (typeof position === 'number') {
			this.data.position = position;
		} else {
			Error(
				'You need to put a number for argument (setPosition[CreateChannelAction])'
			);
		}
		return this;
	}

	setPermissionOverwrites(permission_overwrites) {
		this.data.permission_overwrites = permission_overwrites;
		return this;
	}

	parentId(parent_id) {
		if (typeof parent_id === 'number') {
			this.data.parent_id = parent_id;
		} else {
			Error(
				'You need to put a number for argument (parentId[CreateChannelAction])'
			);
		}
		return this;
	}

	setNSFW(nsfw) {
		if (typeof parent_id === 'boolean') {
			this.data.nsfw = nsfw;
		} else {
			Error(
				'You need to put a boolean for argument (setNSFW[CreateChannelAction])'
			);
		}
		return this;
	}

	async done() {
		return new Promise(async promiseResolve => {
			let yes;
			if (typeof this.data.name === 'string') {
				yes = true;
			} else {
				throw Error({
					type: 'createChannelAction/name',
					error: true,
					errorInfo: {
						message:
							'Enter a name for this channel to create it (done[CreateChannelAction])',
					},
				}) ;
			}
			this.gocheClient.goche.requestManager.postRequest(
				`guilds/${this.guild.id}/channels`,
				(data) => {
					if (data.error === true) {
						throw data;
					}
					promiseResolve(this.guild.channels.get(data.id));
				},
				this.data
			);
			return {
				type: 'http/slow',
				error: true,
				errorInfo: {
					message:
						'Probably the request was not made (done[CreateChannelAction])',
				},
			};
		})
	}
};
