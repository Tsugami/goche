const Guild = require("../../entities/Guild")
const GocheClient = require("../../manager/GocheClient")


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


    async createRole(roleID) {
        if (typeof memberID === 'string') {
            if (typeof roleID === 'string') {
                const member = this.guild.members.get(memberID)
                if (typeof member === 'object') {
                    const role = this.guild.roles.get(roleID)
                    if (typeof role === 'object') {
                        await this.gocheClient.goche.requestManager.otherRequest('delete', `guilds/${this.guild.id}/members/${member.user.id}/roles/${role.id}`, (data) => {
                            if (data.error === true) {
                                return data
                            }
                            return member
                        }, this.data)
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
}