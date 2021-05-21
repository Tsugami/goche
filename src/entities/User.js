const UserFlags = require('../utils/UserFlags');

module.exports = class User {
	constructor(user) {
		this.type = user.bot === true ? 'bot' : 'user';
		this.username = user.username || '';
		this.discriminator = user.discriminator || '';
		this.id = user.id || '';
		if (typeof user.publicFlag === 'number') {
			this.publicFlag =
				user.publicFlag === undefined
					? 0
					: user.publicFlag;
			this.flags = [];
			try {
				for (let flag in UserFlags) {
					const getFlag =
						UserFlags[flag];
					switch (
						(getFlag &
							user.publicFlag) ===
						getFlag
					) {
						case true:
							this.flags.push(
								flag
							);
							break;
					}
				}
			} catch (ignore) {
				console.log(ignore);
			}
		}
		this.isBot = user.bot || false;
		this.avatar = user.avatar || '';
		this.mention = `<@!${user.id}>` || '';
		this.tag = `${user.username}#${user.discriminator}` || '';
	}
};
