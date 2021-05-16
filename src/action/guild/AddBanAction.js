const Guild = require('../../entities/Guild');

module.exports = class AddBanAction {
	constructor(guild = new Guild(), user, delDays = 0, gocheClient) {
		this.guild = guild;
		this.gocheClient = gocheClient;
		this.user = user;
		this.reason = '';
		this.deleteMessageDays = delDays;
		this.time = Date.now();
	}

	/**
	 *
	 * @param {*} reason
	 * @example
	 * guild.ban('Member or ID, tag', 7).reason('Testing').done()
	 */
	setReason(reason) {
		if (typeof reason === 'string') {
			this.reason = reason;
		} else {
			throw Error(
				'You need to put a string for argument'
			);
		}
		return this;
	}

	/**
	 * The class will create a request in the Discord API to punish server users.
	 */
	async done() {
		if (this.user === null) {
			throw Error('You need to inform User to ban.');
		}
		
		return new Promise(async promiseResolve => {
			const classBan = class BanInfo {
				constructor(data) {
					if (data === null) {
						return;
					}
					this.user = data.user;
					this.reason = data.reason;
					this.time = data.time;
				}
			};
			let dataDone = new classBan(null);
			await this.gocheClient.goche.requestManager.otherRequest(
				'put',
				`guilds/${this.guild.id}/bans/${this.user.id}`,
				async (data) => {
					if (data.error === true) {
						throw data;
						return;
					}
	
					promiseResolve(await new classBan({
						user: this.user,
						reason: this.reason,
						time: this.time,
					}));
				},
				{
					delete_message_days: this
						.deleteMessageDays,
					reason: this.reason,
				}
			);
		});
	}
};
