module.exports = {
    4000: {
        code: 4000,
        description: 'Unknown error',
        explanation: 'We\'re not sure what went wrong. Try reconnecting?'
    },
    4001: {
        code: 4001,
        description: 'Unknown opcode',
        explanation: 'You sent an invalid Gateway opcode or an invalid payload for an opcode. Don\'t do that!'
    },
    4002: {
        code: 4002,
        description: 'Decode error',
        explanation: 'You sent an invalid payload to us. Don\'t do that!'
    },
    4003: {
        code: 4003,
        description: 'Not authenticated	',
        explanation: 'You sent us a payload prior to identifying.'
    },
    4004: {
        code: 4004,
        description: 'Authentication failed',
        explanation: 'The account token sent with your identify payload is incorrect.'
    },
    4005: {
        code: 4005,
        description: 'Already authenticated	',
        explanation: 'You sent more than one identify payload. Don\'t do that!'
    },
    4007: {
        code: 4007,
        description: 'Invalid seq',
        explanation: 'The sequence sent when resuming the session was invalid. Reconnect and start a new session.'
    },
    4008: {
        code: 4008,
        description: 'Rate limited',
        explanation: 'Woah nelly! You\'re sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this.'
    },
    4009: {
        code: 4009,
        description: 'Session timed out',
        explanation: 'Your session timed out. Reconnect and start a new one.'
    },
    4010: {
        code: 4010,
        description: 'Invalid shard',
        explanation: 'You sent us an invalid shard when identifying.'
    },
    4011: {
        code: 4011,
        description: 'Sharding required',
        explanation: 'The session would have handled too many guilds - you are required to shard your connection in order to connect.'
    },
    4012: {
        code: 4012,
        description: 'Invalid API version',
        explanation: 'You sent an invalid version for the gateway.'
    },
    4013: {
        code: 4013,
        description: 'Invalid intent(s)',
        explanation: 'You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value.'
    },
    4014: {
        code: 4014,
        description: 'Disallowed intent(s)',
        explanation: 'You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not approved for.'
    },

    emitError: (data, isShard, shardNb) => {
        if (isShard === true) {
            console.error(`Websocket Error ~> ${data.description} (${data.code})\nReason: ${data.explanation}\nShard: ${shardNb}`)
        } else {
            console.error(`Websocket Error ~> ${data.description} (${data.code})\nReason: ${data.explanation}`)
        }
    }
}