const Color = require('../tools/Color');
const Guild = require('./Guild');

module.exports = class Role {
	constructor(role, guild = new Guild()) {
		this.id = role.id;
		this.type = 'role';
		this.name = role.name;
		this.isMentionable = role.mentionable;
		this.managed = role.managed;
		this.hoist = role.hoist;
		this.color = new Color().ToNumber(role.color);
		this.guild = guild;
	}
};
