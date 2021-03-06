const Channel = require('../entities/Channel');
const Guild = require('../entities/Guild');
const Member = require('../entities/Member');
const Message = require('../entities/Message');
const SelfUser = require('../entities/SelfUser');
const GocheClient = require('../manager/GocheClient');
const GocheLibrary = require('../GocheLibrary');
const Payload = require('../utils/Payload');
const VoiceChannel = require('../entities/VoiceChannel');
const VoiceState = require('../entities/VoiceState');
const MemberState = require('../entities/MemberState');
const Interaction = require('../entities/Interaction');
const Role = require('../entities/Role');
const TextChannel = require('../entities/TextChannel');
const ReactionAddEvent = require('../class/ReactionAddEvent');
const ReactionRemoveEvent = require('../class/ReactionRemoveEvent');

module.exports = class GocheController {
	constructor(gocheLibrary = new GocheLibrary()) {
		this.gocheLibrary = gocheLibrary;
		this.gocheClient = gocheLibrary.client;
	}

	async updateCache(data = Payload, shard = 0) {
		switch (this.gocheLibrary.mode) {
			case 'profile':
				switch (data.t) {
					case 'READY':
						this.gocheClient.selfUser = new SelfUser(
							data.d
						);
						this.data = data.d;
						this.gocheClient.goche.listenerManager.listeners
							.filter(
								(
									eventClass
								) =>
									eventClass.eventName ===
									`${data.t}`
							)
							.map(
								(
									eventClass
								) =>
									eventClass.on(
										data
									)
							);

						break;
					case 'GUILD_ROLE_UPDATE':
						this.guildRoleUpdate(
							data
						);
						break;
					case 'GUILD_ROLE_DELETE':
						this.guildRoleDelete(
							data
						);
						break;
					case 'GUILD_ROLE_CREATE':
						this.guildRoleCreate(
							data
						);
						break;
					case 'MESSAGE_CREATE':
						if (
							typeof data
								.d
								.guild_id ===
							'string'
						) {
							this.gocheClient.goche.listenerManager.listeners
								.filter(
									(
										eventClass
									) =>
										eventClass.eventName ===
										`${data.t}`
								)
								.map(
									(
										eventClass
									) =>
										eventClass.on(
											new Message(
												data.d,
												this.gocheClient.guilds.get(
													data
														.d
														.guild_id
												),
												this.gocheClient.goche
											)
										)
								);
						} else {
							/**
							 * It is possible that it is a other type of channel
							 */
							/*
                             this.gocheClient.goche.listenerManager.listeners
                             .filter((eventClass) => eventClass.eventName === `${data.t}`)
                             .map((eventClass) => eventClass.on(new Message(data.d, null, this.gocheClient.goche)))
                             */
						}
						break;
					case 'GUILD_MEMBER_ADD':
						this.guildMemberAddEvent(data);
						this.guildMemberAdd(
							data
						);
						break;
					case 'GUILD_MEMBER_REMOVE':
						this.guildMemberRemoveEvent(data);
						this.guildMemberRemove(
							data
						);
						break;
					case 'MESSAGE_REACTION_ADD':
						this.guildAddReactionEvent(data);
					break;
					case 'MESSAGE_REACTION_REMOVE':
						this.guildRemoveReactionEvent(data);
					break;
					case 'GUILD_CREATE':
						this.guildCreate(
							data
						);
						break;
					case 'CHANNEL_CREATE':
						this.channelCreate(
							data
						);
						break;
					case 'CHANNEL_DELETE':
						this.channelDelete(
							data
						);
						break;
					case 'CHANNEL_UPDATE':
						this.channelUpdate(
							data
						);

						break;
					case 'VOICE_STATE_UPDATE':
						this.voiceState(
							data
						);
						break;
					default:

				}
				break;
		}
	}

	async guildRemoveReactionEvent(data) {
		const guild = this.gocheClient.guilds.get(data.d.guild_id)
		await this.gocheClient.goche.listenerManager.listeners
		.filter(
			(eventClass) =>
				eventClass.eventName ===
				data.t
		)
		.map((eventClass) =>
			eventClass.on(new ReactionRemoveEvent(data.d, guild))
		);
	}


	async guildAddReactionEvent(data) {
		const guild = this.gocheClient.guilds.get(data.d.guild_id)
		await this.gocheClient.goche.listenerManager.listeners
		.filter(
			(eventClass) =>
				eventClass.eventName ===
				data.t
		)
		.map((eventClass) =>
			eventClass.on(new ReactionAddEvent(data.d, guild))
		);
	}

	async guildMemberAddEvent(data) {
	
		await this.gocheClient.goche.listenerManager.listeners
		.filter(
			(eventClass) =>
				eventClass.eventName ===
				data.t
		)
		.map((eventClass) =>
			eventClass.on(new Member(data.d, null))
		);
	}


	async guildMemberRemoveEvent(data) {
		await this.gocheClient.goche.listenerManager.listeners
		.filter(
			(eventClass) =>
				eventClass.eventName ===
				data.t
		)
		.map((eventClass) =>
			eventClass.on(new Member(data.d, null))
		);
	}

	async guildRoleDelete(data) {
		if (typeof data.d.guild_id === 'string') {
			this.gocheClient.guilds
				.get(data.d.guild_id)
				.roles.delete(data.d.role_id);
		}
	}

	async guildRoleUpdate(data) {}

	async guildRoleCreate(data) {
		if (typeof data.d.guild_id === 'string') {
			this.gocheClient.guilds
				.get(data.d.guild_id)
				.roles.set(
					data.d.role.id,
					new Role(
						data.d.role.id,
						this.gocheClient.guilds.get(
							data.d
								.guild_id
						)
					)
				);
		}
	}

	async guildMemberAdd(data) {
		if (typeof data.d.guild_id === 'string') {
			this.gocheClient.guilds
				.get(data.d.guild_id)
				.members.set(
					data.d.user.id,
					new Member(data.d)
				);
		}
	}

	async guildMemberRemove(data) {
		if (typeof data.d.guild_id === 'string') {
			this.gocheClient.guilds
				.get(data.d.guild_id)
				.members.delete(data.d.user.id);
		}
	}

	async intereactionCreate(data) {
		await this.gocheClient.goche.listenerManager.listeners
			.filter(
				(eventClass) =>
					eventClass.eventName ===
					`${data.t}`
			)
			.map((eventClass) =>
				eventClass.on(
					new Interaction(
						data.d,
						this.gocheLibrary
					)
				)
			);
	}

	async guildCreate(data, shard) {
		if (
			this.data.guilds.filter(
				(guild) => guild.id === data.d.id
			).length === 0
		) {
			const guild = new Guild(data.d, this.gocheClient);
			for (let channel of data.d.channels) {
				switch(channel.type) {
					case 0:
						guild.channels.set(
							channel.id,
							new TextChannel(
								channel,
								guild,
								this.gocheClient.goche
							)
						);
						break;
					case 2:
						guild.voiceChannels.set(
							channel.id,
							new VoiceChannel(
								channel,
								guild,
								this.gocheClient.goche
							)
						);
					break;
					case 4:
						// Category
					break;

				}
			}
			
			for (let member of data.d.members) {
				guild.members.set(
					member.user.id,
					new Member(member)
				);
			}

			for (let role of data.d.roles) {
				guild.roles.set(
					role.id,
					new Role(role, guild)
				);
			}

			await this.gocheClient.guilds.set(
				data.d.id,
				guild
			);
			await this.gocheClient.goche.listenerManager.listeners
				.filter(
					(eventClass) =>
						eventClass.eventName ===
						`${data.t}`
				)
				.map((eventClass) =>
					eventClass.on(
						new Guild(
							data.d,
							this.gocheClient
						)
					)
				);
		} else {
			const guild = new Guild(data.d, this.gocheClient);
			for (let channel of data.d.channels) {
				switch(channel.type) {
					case 0:
						guild.channels.set(
							channel.id,
							new TextChannel(
								channel,
								guild,
								this.gocheClient.goche
							)
						);
						break;
					case 2:
						guild.voiceChannels.set(
							channel.id,
							new VoiceChannel(
								channel,
								guild,
								this.gocheClient.goche
							)
						);
					break;
					case 4:
						// Category
					break;

				}
			}
			for (let member of data.d.members) {
				guild.members.set(
					member.user.id,
					new Member(member)
				);
			}

			for (let role of data.d.roles) {
				guild.roles.set(
					role.id,
					new Role(role, guild)
				);
			}

			this.gocheClient.guilds.set(data.d.id, guild);
		}
	}

	async voiceState(data) {
		const guild = this.gocheClient.guilds.get(data.d.guild_id);
		const member = guild.members.get(data.d.user_id);

		if (typeof member === 'undefined') return;

		if (typeof data.d.channel_id === 'string') {
			this.joinMember(data);
			return;
		}

		const stateVoice = new VoiceState(
			guild.voiceChannels.get(data.d.channel_id),
			guild,
			data.d
		);
		const stateUserVoice = new MemberState(
			data.d.member,
			data,
			guild,
            this.gocheLibrary
		);

		stateUserVoice.leaved = Date.now();
		stateUserVoice.connected = false;

		this.gocheClient.goche.listenerManager.listeners
			.filter(
				(eventClass) =>
					eventClass.eventName ===
					`${data.t}`
			)
			.map((eventClass) => eventClass.on(stateVoice));

		if (data.d.channel_id === null) {
			delete member.voiceStage;
			member.voiceStage = null;
			await this.gocheClient.goche.listenerManager.listeners
				.filter(
					(eventClass) =>
						eventClass.eventName ===
						'VOICE_STATE_LEAVE'
				)
				.map((eventClass) =>
					eventClass.on({
						stateVoice: stateVoice,
						memberState: stateUserVoice,
						channel:
							stateVoice.voiceChannel,
						isMoved: false,
					})
				);
		}
	}

	async joinMember(data, isCache) {
		const guild = this.gocheClient.guilds.get(
			`${data.d.guild_id}`
		);

		const member = guild.members.get(data.d.user_id);

		let isMoved = false;

		if (typeof member === 'undefined') return;

		const stateVoice = new VoiceState(
			guild.voiceChannels.get(data.d.channel_id),
			guild,
			data.d,
            this.gocheLibrary
		);
		const stateUserVoice = new MemberState(
			data.d.member,
			guild.voiceChannels.get(data.d.channel_id),
			guild,
            this.gocheLibrary
		);
		const channel = guild.voiceChannels.get(data.d.channel_id);

		if (member.voiceState === null) {
			isMoved = false;
		} else {
			if (
				guild.members.get(data.d.user_id)
					.voiceState.id ===
				data.d.channel_id
			) {
				isMoved = false;
			} else {
				isMoved = true;
				try {
					if (channel === undefined) {
						isMoved = false;
					} else {
						channel.members.set(
							data.d
								.user_id,
							member
						);
						// E1934
					}
					member.voiceState.voiceChannel.members.delete(
						data.d.user_id
					);
				} catch (e) {}
			}

			if (isMoved === true) {
				member.voiceState = stateVoice;
				stateUserVoice.connected = true;
				stateUserVoice.joined = Date.now();
				if (isCache === true) return;
				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							'VOICE_STATE_MOVED'
					)
					.map((eventClass) =>
						eventClass.on({
							stateVoice: stateVoice,
							memberState: stateUserVoice,
							channel:
								stateVoice.voiceChannel,
							isMoved: isMoved,
						})
					);
			}
		}

		stateUserVoice.connected = true;
		stateUserVoice.joined = Date.now();
		member.voiceState = stateVoice;

		if (isCache === true) return;
		await this.gocheClient.goche.listenerManager.listeners
			.filter(
				(eventClass) =>
					eventClass.eventName ===
					'VOICE_STATE_JOIN'
			)
			.map((eventClass) =>
				eventClass.on({
					stateVoice: stateVoice,
					memberState: stateUserVoice,
					channel:
						stateVoice.voiceChannel,
					isMoved: isMoved,
				})
			);
	}

	async channelCreate(data) {
		const guild = this.gocheClient.guilds.get(data.d.guild_id);
		const voiceChannel = new VoiceChannel(
			data.d,
            guild,
			this.gocheLibrary
		);
		const channel = new Channel(
			data.d,
			guild,
			this.gocheLibrary
		);
		switch (data.d.type) {
			case 2:
				this.gocheClient.guilds
					.get(data.d.guild_id)
					.voiceChannels.set(
						voiceChannel.id,
						voiceChannel
					);
				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							`${data.t}`
					)
					.map((eventClass) =>
						eventClass.on(
							voiceChannel
						)
					);
				break;
			case 0:
				this.gocheClient.guilds
					.get(data.d.guild_id)
					.category.set(
						channel.id,
						channel
					);
				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							`${data.t}`
					)
					.map((eventClass) =>
						eventClass.on(
							channel
						)
					);
				break;
			default:
				this.gocheClient.guilds
					.get(data.d.guild_id)
					.channels.set(
						channel.id,
						channel
					);
				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							`${data.t}`
					)
					.map((eventClass) =>
						eventClass.on(
							channel
						)
					);
		}
	}

	async channelDelete(data) {
		const guild = this.gocheClient.guilds.get(data.d.guild_id);
		const voiceChannel = new VoiceChannel(
			data.d,
			guild,
			this.gocheLibrary
		);
		const channel = new Channel(
			data.d,
			guild,
			this.gocheLibrary
		);

		switch (data.d.type) {
			case 2:
				try {
					if (
						typeof this.gocheClient.guilds.get(
							data.d
								.guild_id
						) === 'object'
					) {
						if (
							typeof guild.voiceChannels.get(
								data
									.d
									.channel_id
							) ===
							'object'
						) {
							this
								.gocheClient
								.cacheManager
								.cacheRemoved++;
							guild.voiceChannels.delete(
								data
									.d
									.channel_id
							);
						}
					}
				} catch (e) {
					this.gocheClient.cacheManager
						.cacheCritical++;
				}
				this.gocheClient.guilds
					.get(data.d.guild_id)
					.voiceChannels.delete(
						voiceChannel.id
					);
				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							`${data.t}`
					)
					.map((eventClass) =>
						eventClass.on(
							voiceChannel
						)
					);
				break;
			case 0:
				try {
					if (
						typeof this.gocheClient.guilds.get(
							data.d
								.guild_id
						) === 'object'
					) {
						if (
							typeof guild.category.get(
								data
									.d
									.channel_id
							) ===
							'object'
						) {
							this
								.gocheClient
								.cacheManager
								.cacheRemoved++;
							guild.category.delete(
								data
									.d
									.channel_id
							);
						}
					}
				} catch (e) {
					this.gocheClient.cacheManager
						.cacheCritical++;
				}
				this.gocheClient.guilds
					.get(data.d.guild_id)
					.category.delete(channel.id);
				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							`${data.t}`
					)
					.map((eventClass) =>
						eventClass.on(
							channel
						)
					);
				break;
			default:
				try {
					if (
						typeof this.gocheClient.guilds.get(
							data.d
								.guild_id
						) === 'object'
					) {
						if (
							typeof guild.channels.get(
								data
									.d
									.channel_id
							) ===
							'object'
						) {
							this
								.gocheClient
								.cacheManager
								.cacheRemoved++;
							guild.channels.delete(
								data
									.d
									.channel_id
							);
						}
					}
				} catch (e) {
					this.gocheClient.cacheManager
						.cacheCritical++;
				}
				this.gocheClient.guilds
					.get(data.d.guild_id)
					.channels.delete(channel.id);
				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							`${data.t}`
					)
					.map((eventClass) =>
						eventClass.on(
							channel
						)
					);
		}
	}

	async channelUpdate(data = Payload) {
		const guild = this.gocheClient.guilds.get(data.d.guild_id);
		const voiceChannel = new VoiceChannel(
			data.d,
			guild,
			this.gocheLibrary
		);
		const channel = new Channel(
			data.d,
			guild,
			this.gocheLibrary
		);

		switch (data.d.type) {
			case 2:
				const channelVoiceUpdate = this.gocheClient.guilds
					.get(data.d.guild_id)
					.voiceChannels.get(
						voiceChannel.id
					);
				for (let obj in channel) {
					if (
						typeof channelVoiceUpdate ===
						'object'
					) {
						if (
							channelVoiceUpdate[
								obj
							] ===
							voiceChannel[
								obj
							]
						) {
							/**
							 * How cool, this to be equal to the result of before
							 */
							this
								.gocheClient
								.cacheManager
								.changesRevoked++;
						} else {
							this
								.gocheClient
								.cacheManager
								.cacheChanged++;
							channelVoiceUpdate[
								obj
							] =
								voiceChannel[
									obj
								];
						}
					} else {
						/**
						 * Array and Maps cannot be changed. This is only updated when the Discord API sends an update event.
						 */
					}
				}

				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							`${data.t}`
					)
					.map((eventClass) =>
						eventClass.on(
							channelVoiceUpdate
						)
					);
				break;
			case 0:
				const channelUpdate = this.gocheClient.guilds
					.get(data.d.guild_id)
					.channels.get(channel.id);
				for (let obj in channel) {
					if (
						typeof channelUpdate ===
						'object'
					) {
						if (
							channelUpdate[
								obj
							] ===
							channel[
								obj
							]
						) {
							/**
							 * How cool, this to be equal to the result of before
							 */
							this
								.gocheClient
								.cacheManager
								.changesRevoked++;
						} else {
							this
								.gocheClient
								.cacheManager
								.cacheChanged++;
							channelUpdate[
								obj
							] =
								channel[
									obj
								];
						}
					} else {
						/**
						 * Array and Maps cannot be changed. This is only updated when the Discord API sends an update event.
						 */
					}
				}
				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							`${data.t}`
					)
					.map((eventClass) =>
						eventClass.on(
							channelUpdate
						)
					);
				break;
			case 0:
				const categoryUpdate = this.gocheClient.guilds
					.get(data.d.guild_id)
					.channels.get(channel.id);
				for (let obj in channel) {
					if (
						typeof categoryUpdate ===
						'object'
					) {
						if (
							categoryUpdate[
								obj
							] ===
							channel[
								obj
							]
						) {
							/**
							 * How cool, this to be equal to the result of before
							 */
							this
								.gocheClient
								.cacheManager
								.changesRevoked++;
						} else {
							this
								.gocheClient
								.cacheManager
								.cacheChanged++;
							categoryUpdate[
								obj
							] =
								channel[
									obj
								];
						}
					} else {
						/**
						 * Array and Maps cannot be changed. This is only updated when the Discord API sends an update event.
						 */
					}
				}
				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							`${data.t}`
					)
					.map((eventClass) =>
						eventClass.on(
							categoryUpdate
						)
					);
				break;
			default:
				const channelUpdateOther = this.gocheClient.guilds
					.get(data.d.guild_id)
					.channels.get(channel.id);
				for (let obj in channel) {
					if (
						typeof channelUpdateOther ===
						'object'
					) {
						if (
							channelUpdateOther[
								obj
							] ===
							channel[
								obj
							]
						) {
							/**
							 * How cool, this to be equal to the result of before
							 */
						} else {
							this
								.gocheClient
								.cacheManager
								.cacheChanged++;
							channelUpdateOther[
								obj
							] =
								channel[
									obj
								];
						}
					} else {
						/**
						 * Array and Maps cannot be changed. This is only updated when the Discord API sends an update event.
						 */
					}
				}
				await this.gocheClient.goche.listenerManager.listeners
					.filter(
						(eventClass) =>
							eventClass.eventName ===
							`${data.t}`
					)
					.map((eventClass) =>
						eventClass.on(
							channelUpdateOther
						)
					);
		}
	}
};
