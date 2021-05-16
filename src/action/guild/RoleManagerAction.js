const Guild = require('../../entities/Guild');
const GocheClient = require('../../manager/GocheClient');
const ModifyRoleAction = require('./ModifyRoleAction');
const RoleCreateAction = require('./RoleCreateAction');

module.exports = class RoleManagerAction {
	constructor(gocheClient = new GocheClient(), guild = new Guild()) {
		this.gocheClient = gocheClient;
		this.guild = guild;
	}

	async addRole(memberID, roleID) {
		return new Promise.all(promiseResolve => {
			if (typeof memberID === 'string') {
				if (typeof roleID === 'string') {
					const member = this.guild.members.get(
						memberID
					);
					if (typeof member === 'object') {
						const role = this.guild.roles.get(
							roleID
						);
	
						if (
							typeof role ===
							'object'
						) {
							this.gocheClient.goche.requestManager.otherRequest(
								'put',
								`guilds/${this.guild.id}/members/${member.user.id}/roles/${role.id}`,
								(
									data
								) => {
									if (
										data.error ===
										true
									) {
										promiseResolve(dataRole);
									} else {
										dataRole = member;
										promiseResolve(member.roles.set(
											role.id,
											role
										));
										
									}
	
									return dataRole;
								},
								{}
							);
							return dataRole;
						} else {
							promiseResolve({
								type:
									'unknown/role',
								error: true,
								errorInfo: {
									message:
										'This role does not exist or has not been registered.',
								},
							})
					
						}
					} else {
						promiseResolve({
							type:
								'unknown/member',
							error: true,
							errorInfo: {
								message:
									'Member has not been registered as a cache or does not exist',
							},
						});
					}
				} else {
					throw Error(
						'Set the Argument to String (RoleManagerAction.addRole[RoleID])'
					);
				}
			} else {
				throw Error(
					'Set the Argument to String (RoleManagerAction.addRole[MemberID])'
				);
			}
		})
	}

	async removeRole(memberID, roleID) {
		return new Promise.all(promiseResolve => {
			if (typeof memberID === 'string') {
				if (typeof roleID === 'string') {
					const member = this.guild.members.get(
						memberID
					);
					if (typeof member === 'object') {
						const role = this.guild.roles.get(
							roleID
						);
						if (
							typeof role ===
							'object'
						) {
							this.gocheClient.goche.requestManager.otherRequest(
								'delete',
								`guilds/${this.guild.id}/members/${member.user.id}/roles/${role.id}`,
								(
									data
								) => {
									if (
										data.error ===
										true
									) {
										promiseResolve(data);
									}
									dataRole = member;
									promiseResolve(member.roles.delete(
										role.id
									));
									
								},
								this.data
							);
							return dataRole;
						} else {
							promiseResolve({
								type:
									'unknown/role',
								error: true,
								errorInfo: {
									message:
										'This role does not exist or has not been registered.',
								},
							});
						}
					} else {
						promiseResolve({
							type:
								'unknown/member',
							error: true,
							errorInfo: {
								message:
									'Member has not been registered as a cache or does not exist',
							},
						});
					}
				} else {
					throw Error(
						'Set the Argument to String (RoleManagerAction.addRole[RoleID])'
					);
				}
			} else {
				throw Error(
					'Set the Argument to String (RoleManagerAction.addRole[MemberID])'
				);
			}
		})
	
	}

	async createRole() {
		return new RoleCreateAction(this.gocheClient, this.guild);
	}

	async deleteRole(id) {
		return new Promise(promiseResolve => {
			if (typeof id === 'string') {
				const getRole = this.guild.roles.get(id);
				if (typeof getRole === 'object') {
					this.gocheClient.goche.requestManager.otherRequest(
						'delete',
						`guilds/${this.guild.id}/roles/${role.id}`,
						(data) => {
							if (
								data.error ===
								true
							) {
								promiseResolve(data);
							} else {
								promiseResolve(getRole);
							}
						},
						this.data
					);
					return dataRole;
				} else {
					promiseResolve({
						type: 'role/unknown',
						error: true,
						errorInfo: {
							message:
								'This role does not exist or has not been registered in the cache.',
						},
					});
				}
			} else {
				throw Error(
					'You need to enter the ID to delete this role! (RoleManagerAction.deleteRole[MemberID])'
				);
			}
		})
		
	}

	async setPositionRole(id, newPosition) {
		return Promise(promiseResolve => {
			if (typeof id === 'string') {
				const getRole = this.guild.roles.get(id);
				if (typeof getRole === 'object') {
					this.gocheClient.goche.requestManager.otherRequest(
						'patch',
						`guilds/${this.guild.id}/roles`,
						(data) => {
							if (
								data.error ===
								true
							) {
								promiseResolve(data);
							} else {
								promiseResolve(getRole);
							}
						},
						{
							id: getRole.id,
							position: newPosition,
						}
					);
					return dataRole;
				} else {
					promiseResolve({
						type: 'role/unknown',
						error: true,
						errorInfo: {
							message:
								'This role does not exist or has not been registered in the cache.',
						},
					});
				}
			} else {
				throw Error(
					'You need to enter the ID with string to move this role! (RoleManagerAction.deleteRole[MemberID])'
				);
			}
		})
		
	}

	async modifyRole(id) {
		return new Promise.all(promiseResolve => {
			if (typeof id === 'string') {
				const getRole = this.guild.roles.get(id);
				if (typeof getRole === 'object') {
					promiseResolve(new ModifyRoleAction(
						this.gocheClient,
						this.guild,
						getRole
					));
				} else {
					promiseResolve({
						type: 'role/unknown',
						error: true,
						errorInfo: {
							message:
								'This role does not exist or has not been registered in the cache.',
						},
					});
				}
			} else {
				throw Error(
					'You need to enter the ID to delete this role! (RoleManagerAction.deleteRole[MemberID])'
				);
			}
		})
	}
};
