const User = require('./User');
const VoiceChannel = require('./VoiceChannel');
const VoiceState = require('./VoiceState');

module.exports = class Member {
	constructor(member, voiceState) {
		this.user = new User(member.user);
		this.roles = new Map();
		this.pending = member.pending || null;
		this.isPeding = member.isPeding || null;
		this.nick = member.nick || null;
		this.joinedAt = Date.parse(member.joined_at);
		this.premiumSince =
			member.premium_since === null
				? null
				: Date.parse(member.premium_since);
		this.hoistedRole = member.hoisted_role;
		this.mute = member.false || null;
		this.deaf = member.deaf || null;
		this.voiceState = null;
	}


};
