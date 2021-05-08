const Channel = require('./Channel');
const Guild = require('./Guild');
const Member = require('./Member');

module.exports = class VoiceChannel extends Channel {
	constructor(channel, guild = new Guild()) {
        /**
         * @deprecated @version 0.0.2
		```
        this.id = channel.id || '';
		this.name = channel.name;
		this.type = 'voiceChannel';
		this.guildID = guild.id;
		this.guild = guild;
        ```
		
        */
		super(channel, guild);
		

		this.userLimit = channel.user_limit;
		this.position = channel.position;
		this.region =
			channel.rtc_region === null
				? 'auto'
				: channel.rtc_region;
		this.permissionOverwrites = channel.permission_overwrites;
		this.members = new Map();
	}
};
