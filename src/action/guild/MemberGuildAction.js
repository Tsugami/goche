const Guild = require('../../entities/Guild');
const Member = require('../../entities/Member');
const Role = require('../../entities/Role');
const GocheClient = require('../../manager/GocheClient');

module.exports = class MemberGuildAction {
	constructor(
		gocheClient = new GocheClient(),
		guild = new Guild(),
		member = new Member()
	) {
		this.gocheClient = gocheClient;
		this.member = member;
		this.guild = guild;
		this.data = {
			roles: [],
		};
	}

	setNick(nickname) {
		if (roles.length >= 0) {
			Error(
				'You need put nickname for that user (setNick[MemberGuildAction])'
			);
			return this;
		}
		this.data.nick = nickname;
		return this;
	}

	setRoles(...roles) {
		if (roles.length >= 0) {
			Error(
				'There are no roles in the Array (setRoles[MemberGuildAction])'
			);
			return this;
		}
		if (typeof roles === 'object') {
			for (let role of roles) {
				if (role instanceof Role) {
					this.data.roles.push(role);
				}
			}
		} else {
			Error(
				'You need to mention roles within the Array (setRoles[MemberGuildAction])'
			);
			return this;
		}
		return this;
	}

	setMute(mute) {
		if (typeof mute === 'boolean') {
			this.data.mute = mute;
		} else {
			Error(
				'Argument has to be Boolean. (setMute[MemberGuildAction])'
			);
		}
		return this;
	}

	setDeaf(deaf) {
		if (typeof mute === 'boolean') {
			this.data.deaf = deaf;
		} else {
			Error(
				'Argument has to be Boolean. (setDeaf[MemberGuildAction])'
			);
		}
		return this;
	}

	moveChannel(channelID) {
		if (typeof channelID === 'string') {
			this.data.channelID = channelID;
		} else {
			Error(
				'Set the Argument to String. (moveChannel[MemberGuildAction])'
			);
		}
	}

	async done() {
		await this.gocheClient.goche.requestManager.otherRequest(
			'patch',
			`guilds/${this.guild.id}/members/${this.member.user.id}`,
			(data) => {
				if (data.error === true) {
					return data;
				}
				return this.guild.channels.get(data.id);
			},
			this.data
		);
		return {
			type: 'http/slow',
			error: true,
			errorInfo: {
				message:
					'Probably the request was not made (done[MemberGuildAction])',
			},
		};
	}
};
