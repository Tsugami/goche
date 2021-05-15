const Guild = require('./Guild');
const Member = require('./Member');
const VoiceChannel = require('./VoiceChannel');

module.exports = class VoiceState {
	constructor(channel, guild, data) {
		this.type = 'voiceState';
		this.voiceChannel = guild.voiceChannels.get(data.channel_id);
		this.channelID = data;
		this.sessionID = data.session_id;
		this.selfVideo = data.self_video;
		this.selfMute = data.self_mute;
		this.selfDeaf = data.self_deaf;
		this.requestToSpeakTimestamp =
			data.request_to_speak_timestamp;
		this.mute = data.mute;
		this.deaf = data.deaf;
		this.suppress = data.suppress;
	}
};
