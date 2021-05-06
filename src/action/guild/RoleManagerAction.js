const Guild = require("../../entities/Guild")
const GocheClient = require("../../manager/GocheClient")
const ModifyRoleAction = require("./ModifyRoleAction")
const RoleCreateAction = require("./RoleCreateAction")


module.exports = class RoleManagerAction {
    constructor(gocheClient = new GocheClient(), guild = new Guild()) {
        this.gocheClient = gocheClient
        this.guild = guild
    }

    async addRole(memberID, roleID) {
        let dataRole = null
        if (typeof memberID === 'string') {
            if (typeof roleID === 'string') {
                const member = this.guild.members.get(memberID)
                if (typeof member === 'object') {
                    const role = this.guild.roles.get(roleID)
            
                    if (typeof role === 'object') {
                        
                        await this.gocheClient.goche.requestManager.otherRequest('put', `guilds/${this.guild.id}/members/${member.user.id}/roles/${role.id}`, (data) => {
                            if (data.error === true) {
                                dataRole = data
                            } else {
                                dataRole = member
                                member.roles.set(role.id, role)
                            }
                        
                        return dataRole
                        }, {    })
                        return dataRole
                    } else {
                        return {
                            type: 'unknown/role',
                            error: true, 
                            errorInfo: {
                                message: 'This role does not exist or has not been registered.'
                            }
                        }
                    }
                } else {
                    return {
                        type: 'unknown/member',
                        error: true, 
                        errorInfo: {
                            message: 'Member has not been registered as a cache or does not exist'
                        }
                    }
                }
            } else {
                Error('Set the Argument to String (RoleManagerAction.addRole[RoleID])')
            }
        } else {
            Error('Set the Argument to String (RoleManagerAction.addRole[MemberID])')
        }
    }


    async removeRole(memberID, roleID) {
        let dataRole = null
        if (typeof memberID === 'string') {
            if (typeof roleID === 'string') {
                const member = this.guild.members.get(memberID)
                if (typeof member === 'object') {
                    const role = this.guild.roles.get(roleID)
                    if (typeof role === 'object') {
                        await this.gocheClient.goche.requestManager.otherRequest('delete', `guilds/${this.guild.id}/members/${member.user.id}/roles/${role.id}`, (data) => {
                            if (data.error === true) {
                                dataRole = data
                            }
                            dataRole = member
                            member.roles.delete(role.id)
                        }, this.data)
                        return dataRole
                    } else {
                        return {
                            type: 'unknown/role',
                            error: true, 
                            errorInfo: {
                                message: 'This role does not exist or has not been registered.'
                            }
                        }
                    }
                } else {
                    return {
                        type: 'unknown/member',
                        error: true, 
                        errorInfo: {
                            message: 'Member has not been registered as a cache or does not exist'
                        }
                    }
                }
            } else {
                Error('Set the Argument to String (RoleManagerAction.addRole[RoleID])')
            }
        } else {
            Error('Set the Argument to String (RoleManagerAction.addRole[MemberID])')
        }
    }


    async createRole() {
        return new RoleCreateAction(this.gocheClient, this.guild)   
    }

    async deleteRole(id) {
        let dataRole
        if (typeof id === 'string') {
            const getRole = this.guild.roles.get(id)
            if (typeof getRole === 'object') {
                await this.gocheClient.goche.requestManager.otherRequest('delete', `guilds/${this.guild.id}/roles/${role.id}`, (data) => {
                    if (data.error === true) {
                        dataRole = data
                    } else {
                        dataRole = getRole
                    } 
                }, this.data)
                return dataRole
            } else {
                return {
                    type: 'role/unknown',
                    error: true,
                    errorInfo: {
                        message: 'This role does not exist or has not been registered in the cache.'
                    }
                }
            }
        } else {
            Error('You need to enter the ID to delete this role! (RoleManagerAction.deleteRole[MemberID])')
        }
    }



    async setPositionRole(id, newPosition) {
        let dataRole
        if (typeof id === 'string') {
            const getRole = this.guild.roles.get(id)
            if (typeof getRole === 'object') {
                await this.gocheClient.goche.requestManager.otherRequest('patch', `guilds/${this.guild.id}/roles`, (data) => {
                    if (data.error === true) {
                        dataRole = data
                    } else {
                        dataRole = getRole
                    } 
                }, {
                    id: getRole.id,
                    position: newPosition
                })
                return dataRole
            } else {
                return {
                    type: 'role/unknown',
                    error: true,
                    errorInfo: {
                        message: 'This role does not exist or has not been registered in the cache.'
                    }
                }
            }
        } else {
            Error('You need to enter the ID to delete this role! (RoleManagerAction.deleteRole[MemberID])')
        }
    }


    async modifyRole(id) {
        let dataRole
        if (typeof id === 'string') {
            const getRole = this.guild.roles.get(id)
            if (typeof getRole === 'object') {
                return new ModifyRoleAction(this.gocheClient, this.guild, getRole)
            } else {
                return {
                    type: 'role/unknown',
                    error: true,
                    errorInfo: {
                        message: 'This role does not exist or has not been registered in the cache.'
                    }
                }
            }
        } else {
            Error('You need to enter the ID to delete this role! (RoleManagerAction.deleteRole[MemberID])')
        }
    }


    
}