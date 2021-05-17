


module.exports = class MessageFlags {
    constructor(flag) {
        this.numberFlag = flag
        this.flags = []
        this.flagsMap = {
            
            /**
             * @description This message has been published to subscribed channels (via Channel Following)
             */
            crossPosted: 1 << 0,

            /**
             * @description This message originated from a message in another channel (via Channel Following)
             */
            isCrossPosted: 1 << 1,

            /**
             * @description Do not include any embeds when serializing this message
             */
            suppressEmbeds: 1 << 2,

            /**
             * @description The source message for this crosspost has been deleted (via Channel Following)
             */
            sourceMessageDeleted: 1 << 3,

            /**
             * @description This message came from the urgent message system
             */
            urgent: 1 << 4,

            /**
             * @description This message has an associated thread, with the same id as the message
             */
            hasThread: 1 << 5,

            /**
             * @description This message is only visible to the user who invoked the Interaction
             */
            ephemeral: 1 << 6,

            /**
             * @description This message is an Interaction Response and the bot is "thinking"
             */
            loading: 1 << 7
        }

        for (let flagName in this.flagsMap) {
            switch ((this.flagsMap[flagName] & this.numberFlag) === this.flagsMap[flagName]) {
                case true:
                    this.flags.push(flagName)
                break;
            }
        }

    }
}