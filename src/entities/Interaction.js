const GocheLibrary = require('../GocheLibrary')
const CommandInteraction = require('./CommandInteraction')
const Member = require('./Member')




module.exports = class Interaction {
    constructor(interaction, gocheLibrary = new GocheLibrary()) {
        this.version = interaction.version
        this.gocheLibrary = gocheLibrary
        this.type = interaction.type
        this.token = interaction.token
        this.member = new Member(interaction.member, null)
        this.id = interaction.id
        this.guildID = interaction.guild_id
        this.guild = this.gocheLibrary.client.guilds.get(interaction.guild_id)
        this.channelID = interaction.channel_id
        this.channel = this.guild.channels.get(this.channelID)
        this.applicationID = interaction.application_id
        this.application = this.gocheLibrary.client.selfUser
    }



    /**
     * This method creates a request in the Discord API that is received by the INTERACTION_CREATE event that it makes to respond to the interaction.
     * 
     * 
     * @Type 4
     */
    async createResponse(content) {
        if (typeof content === 'object') {
            this.gocheLibrary.requestManager.postRequest(`interactions/${this.id}/${this.token}/callback`, function data(res) {
       
            }, {
                type: 4,
                data: content
            })
        } else {
            this.gocheLibrary.requestManager.postRequest(`interactions/${this.id}/${this.token}/callback`, function data(res) {
       
            }, {
                type: 4,
                data: {
                    content: content
                }
            })
        }
       
    }

