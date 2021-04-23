const type = {
    0: 'Game',
    1: 'Streaming',
    2: 'Listening',
    3: 'Watching',
    4: 'Custom',
    5: 'Competing'
}

const typeNb = {
    Game: 0,
    Streaming: 1,
    Listening: 2,
    Watching: 3,
    Custom: 4,
    Competing: 5
}



module.exports = class Activities {
    constructor() {
        this.name = ''
        this.type = ''
        this.url = ''
        this.details = ''
        this.since = Date.now()
        this.status = 'online'
        
    }
    /**
     * 
     * @param {*} name the activity name
     * @param {*} details the bot current party status
     * @param {*} state what the player is currently doing
     * @param {*} url stream url
     * @returns Activities
     */
    setTwitch(name, details, state, url) {
        this.name = name
        this.details = details
        this.state = state
        this.type = typeNb['Streaming']
        this.url = url
        return this
    }

    /**
     * 
     * @param {*} name the activity name
     * @returns Activities
     */
    setListening(name) {
        this.details = null
        this.type = typeNb['Listening']
        this.name = name
        return this
    }

    /**
     * 
     * @param {*} status Name of status
     * @returns Activities
     */
    setStatus(status) {
        this.status = status
        return this
    }


    presenceWS() {
        if (this.type === 1) {
            return {
                name: this.name,
                state: this.state,
                details: this.details,
                type: this.type,
                url: this.url
            }
        } else {
            return {
                name: this.name,
                type: this.type
            }
        }
    }



}