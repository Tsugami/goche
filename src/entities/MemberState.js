const Member = require('./Member');
const VoiceChannel = require('./VoiceChannel');

module.exports = class MemberState {
	constructor(user, voice, guild, gocheLibrary) {
		this.member = new Member(user);
		this.channel = new VoiceChannel(voice, guild,  gocheLibrary);
		this.connected = false;
		this.joined = Date.now();
		this.leaved = false;
	}


	kick() {
		
	}
};
