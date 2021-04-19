const { default: axios } = require('axios')
const https = require('https')

module.exports = class httpManager {
    constructor(gocheLibrary) {
        this.gocheLibrary = gocheLibrary
        this.queueRatelimit = []
    }
    async otherRequest(method, path, response, data) {

        switch(method) {
            case 'delete':
            return axios.delete(`https://discord.com/api/v8/${path}`, {
                method: method,
                headers: {
                    Authorization: `Bot ${this.gocheLibrary.token}`,
                    'User-Agent': 'Discord Bot (https://github.com/NavyCake)',
                    'Content-Type': 'application/json',
                    'X-RateLimit-Precision': 'millisecond'
                },
                data: data
            })
            .then(res => {
                if (res.status === 429) {
                    return {
                        ratelimit: true
                    }
                }
                response(res)
              
            })
            .catch(error => response(error))
            break;
            case 'patch':
             
                return axios.patch(`https://discord.com/api/v8/${path}`,  data, {
                    headers: {
                        Authorization: `Bot ${this.gocheLibrary.token}`,
                        'User-Agent': 'Discord Bot (https://github.com/NavyCake)',
                        'Content-Type': 'application/json',
                        'X-RateLimit-Precision': 'millisecond'
                    }
                   
                })
                .then(res => {
                    if (res.status === 429) {
                        return {
                            ratelimit: true
                        }
                    }
              
                    response(res)
                  
                })
                .catch(error => response(error))
                break;
                default: 
                return axios[method](`https://discord.com/api/v8/${path}`, {
                    method: method,
                    headers: {
                        Authorization: `Bot ${this.gocheLibrary.token}`,
                        'User-Agent': 'Discord Bot (https://github.com/NavyCake)',
                        'Content-Type': 'application/json',
                        'X-RateLimit-Precision': 'millisecond'
                    }
                   
                }, data)
                .then(res => {
                    if (res.status === 429) {
                        return {
                            ratelimit: true
                        }
                    }
                    response(res)
                  
                })
                .catch(error => response(error))
        }
 
     
    }
    async postRequest(path, response, data) {
    
        return axios.post(`https://discord.com/api/v8/${path}`, data, {
            headers: {
                Authorization: `Bot ${this.gocheLibrary.token}`,
                'User-Agent': 'Discord Bot (https://github.com/NavyCake)',
                'Content-Type': 'application/json',
                'X-RateLimit-Precision': 'millisecond'
            },
        })
        .then(res => {
            if (res.status === 429) {
                return
            } else {
                response(res)
                delete res.data
         
            }
        })
        .catch(error => response(error))
        
    }
    async getRequest(path, response, data) {
        return axios.get(`https://discord.com/api/v8/${path}`, {
            headers: {
                Authorization: `Bot ${this.gocheLibrary.token}`,
                'User-Agent': 'Discord Bot (https://github.com/NavyCake)',
                'Content-Type': 'application/json',
                'X-RateLimit-Precision': 'millisecond'
            }
        })
        .then(res => response(res))
        .catch(error => response(error))
    }
}