module.exports = { 

    tts: false,

    /**
     * @description Type of interaction you can do with the API.
     * 
     * @Type 1 = ACK A Ping
     * @Type4 = Respond to an interaction
     * @Type 5 = ACK an interaction and edit a response later, the user sees a loading state
     * 
     * 
     * @deprecated 2 and 3 has been discontinued, reason is in the documentation!
     * 
     * 
     * @Docs https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype
     */
    type: 0,


    /**
     * @description One way to work with Slash Command.
     * @Docs https://discord.com/developers/docs/interactions/slash-commands#interaction-response
     */
    data: {
        flags: '',
        content: '',
        allowed_mentions: {
            parse: '',
            users: ''
        },
    }
}