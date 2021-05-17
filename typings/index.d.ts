import GocheLibrary from '../src/GocheLibrary'

export type Intents = [
    'directMessageReaction',
    'directMessageTyping',
    'directMessages',
    'guildBan',
    'guildEmoji',
    'guildIntegrations',
    'guildInvites',
    'guildMembers',
    'guildMessage',
    'guildMessageReaction',
    'guildMessageTyping',
    'guildPresence',
    'guildVoiceState',
    'guildWebhook',
    'guilds'
]

export type IgnoreCacheList = [
    'applicationCommandCreate',
    'applicationCommandUpdate',
    'applicationCommandDelete',
    'channelUpdate',
    'channelDelete',
    'channelCreate',
    'channelPinsUpdate',
    'threadCreate',
    'threadUpdate',
    'threadDelete',
    'threadListSync',
    'threadMemberUpdate',
    'threadMembersUpdate',
    'guildCreate',
    'guildUpdate',
    'guildDelete',
    'guildBanAdd',
    'guildBanRemove',
    'guildEmojisUpdate',
    'guildMemberAdd',
    'guildMemberUpdate',
    'guildMembersChunk',
    'guildRoleCreate',
    'guildRoleUpdate',
    'guildRoleDelete',
    'integratonCreate',
    'integratonUpdate',
    'integratonDelete',
    'interactionUpdate',
    'interactionCreate',
    'interactionDelete',
    'inviteCreate',
    'inviteDelete',
    'messageCreate',
    'messageDelete',
    'messageUpdate',
    'messageDeleteBulk',
    'messageReactionAdd',
    'messageReactionUpdate',
    'messageReactionDelete',
    'messageReactionDeleteAll',
    'messageReactionDeleteEmoji',
    'presenceUpdate',
    'typingStart',
    'userUpdate',
    'voiceStateUpdate',
    'voiceServerUpdate',
    'webhooksUpdate'
]
export class GocheLibrary {
    private token: string
    mode: string
    client: GocheClient
    constructor(token: string)

    light() : this
    createProfile(mode, ...shardInt) : this;
    setIntents(intents: Array<string>) : this
    ignoreCache(ignoreCache: Array<string>) : this
}

export class GocheClient {
    
}

export class HttpAPI {}

export class GocheListenerAdapter {}

export class GocheController {}

export class SlashManager {}

export class Activities {}

export class IntentsManager {}

export class RequestControlAction {}