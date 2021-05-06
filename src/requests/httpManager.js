const { default: axios } = require('axios')
const JSONError = require('../error/JSONError')
const RequestError = require('../error/RequestError')
const GocheInfo = require('../GocheInfo')

module.exports = class httpManager {
    constructor(gocheLibrary) {
        this.gocheLibrary = gocheLibrary
        this.queueRatelimit = []
    }
    async otherRequest(method, path, response, data) {

        switch(method) {
            case 'delete':
            return axios.delete(`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`, {
                method: method,
                headers: {
                    Authorization: `Bot ${this.gocheLibrary.token}`,
                    'User-Agent': 'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
                    'Content-Type': 'application/json',
                    'X-RateLimit-Precision': 'millisecond'
                },
                data: data
            })
            .then(res => {
                    
                if (res.status === 429) {
                    this.gocheLibrary.gocheClient.heartbeart.ratelimit++
                    response({
                        error: true,
                        errorInfo: RequestError[res.status],
                        ratelimit: true
                    })
                    return {
                        type: 'http',
                        error: true,
                        errorInfo: RequestError[res.status],
                        ratelimit: true
                    }
                }
                if (res.status < 205) {
                    response(res.data)
                } else {
            
                    if (typeof res.data.code === 'number') {
                        response({
                            type: 'http/jsonerror/statuscode',
                            error: true,
                            errorInfo: JSONError[res.data.code],
                            ratelimit: true
                        })
                    } else {
                        response({
                            type: 'http/statuscode',
                            error: true,
                            errorInfo: res.status,
                            ratelimit: true
                        })
                    }
                    return {
                        type: 'http/status',
                        error: true,
                        errorInfo: JSONError[res.data.code],
                        ratelimit: true
                    }
                }
                // this.gocheLibrary.gocheClient.heartbeart.requests++
            })
            .catch(resError => {
               
                if (resError.status === 200) {
                  /**
                   * No code ...
                   */
               
                } else {
                  
                    if (typeof resError.response === 'object') {
                        if (typeof resError.response.data === 'object') {
                            response({
                                type: 'http-external',
                                error: true,
                                errorInfo: JSONError[resError.response.data.code]
                            })
                        }
                    } else {
                        response({
                            type: 'http-external',
                            error: true,
                            errorInfo: resError
                        })
                    }
                }
            })
            break;
            case 'patch':
             
                return axios.patch(`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`,  data, {
                    headers: {
                        Authorization: `Bot ${this.gocheLibrary.token}`,
                        'User-Agent': 'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
                        'Content-Type': 'application/json',
                        'X-RateLimit-Precision': 'millisecond'
                    }
                   
                })
                .then(res => {
                    
                    if (res.status === 429) {
                        this.gocheLibrary.gocheClient.heartbeart.ratelimit++
                        response({
                            error: true,
                            errorInfo: RequestError[res.status],
                            ratelimit: true
                        })
                        return {
                            type: 'http',
                            error: true,
                            errorInfo: RequestError[res.status],
                            ratelimit: true
                        }
                    }
                    if (res.status < 205) {
                        response(res.data)
                    } else {
                
                        if (typeof res.data.code === 'number') {
                            response({
                                type: 'http/jsonerror/statuscode',
                                error: true,
                                errorInfo: JSONError[res.data.code],
                                ratelimit: true
                            })
                        } else {
                            response({
                                type: 'http/statuscode',
                                error: true,
                                errorInfo: res.status,
                                ratelimit: true
                            })
                        }
                        return {
                            type: 'http/status',
                            error: true,
                            errorInfo: JSONError[res.data.code],
                            ratelimit: true
                        }
                    }
                    // this.gocheLibrary.gocheClient.heartbeart.requests++
                })
                .catch(resError => {
                   
                    if (resError.status === 200) {
                      /**
                       * No code ...
                       */
                   
                    } else {
                      
                        if (typeof resError.response === 'object') {
                            if (typeof resError.response.data === 'object') {
                                response({
                                    type: 'http-external',
                                    error: true,
                                    errorInfo: JSONError[resError.response.data.code]
                                })
                            }
                        } else {
                            response({
                                type: 'http-external',
                                error: true,
                                errorInfo: resError
                            })
                        }
                    }
                })
                break;
                case 'put':
                return axios.put(`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`, data, {
                    headers: {
                        Authorization: `Bot ${this.gocheLibrary.token}`,
                        'User-Agent': 'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
                        'Content-Type': 'application/json',
                        'X-RateLimit-Precision': 'millisecond'
                    }
                   
                })
                .then(res => {
                    
                    if (res.status === 429) {
                        this.gocheLibrary.gocheClient.heartbeart.ratelimit++
                        response({
                            error: true,
                            errorInfo: RequestError[res.status],
                            ratelimit: true
                        })
                        return {
                            type: 'http',
                            error: true,
                            errorInfo: RequestError[res.status],
                            ratelimit: true
                        }
                    }
                    if (res.status < 205) {
                        response(res.data)
                    } else {
                
                        if (typeof res.data.code === 'number') {
                            response({
                                type: 'http/jsonerror/statuscode',
                                error: true,
                                errorInfo: JSONError[res.data.code],
                                ratelimit: true
                            })
                        } else {
                            response({
                                type: 'http/statuscode',
                                error: true,
                                errorInfo: res.status,
                                ratelimit: true
                            })
                        }
                        return {
                            type: 'http/status',
                            error: true,
                            errorInfo: JSONError[res.data.code],
                            ratelimit: true
                        }
                    }
                    // this.gocheLibrary.gocheClient.heartbeart.requests++
                })
                .catch(resError => {
                   
                    if (resError.status === 200) {
                      /**
                       * No code ...
                       */
                   
                    } else {
                      
                        if (typeof resError.response === 'object') {
                            if (typeof resError.response.data === 'object') {
                                response({
                                    type: 'http-external',
                                    error: true,
                                    errorInfo: JSONError[resError.response.data.code]
                                })
                            }
                        } else {
                            response({
                                type: 'http-external',
                                error: true,
                                errorInfo: resError
                            })
                        }
                    }
                })
                break;
                default: 
                return axios[method](`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`, {
                    method: method,
                    headers: {
                        Authorization: `Bot ${this.gocheLibrary.token}`,
                        'User-Agent': 'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
                        'Content-Type': 'application/json',
                        'X-RateLimit-Precision': 'millisecond'
                    }
                   
                }, data)
                .then(res => {
                    
                    if (res.status === 429) {
                        this.gocheLibrary.gocheClient.heartbeart.ratelimit++
                        response({
                            error: true,
                            errorInfo: RequestError[res.status],
                            ratelimit: true
                        })
                        return {
                            type: 'http',
                            error: true,
                            errorInfo: RequestError[res.status],
                            ratelimit: true
                        }
                    }
                    if (res.status < 205) {
                        response(res.data)
                    } else {
                
                        if (typeof res.data.code === 'number') {
                            response({
                                type: 'http/jsonerror/statuscode',
                                error: true,
                                errorInfo: JSONError[res.data.code],
                                ratelimit: true
                            })
                        } else {
                            response({
                                type: 'http/statuscode',
                                error: true,
                                errorInfo: res.status,
                                ratelimit: true
                            })
                        }
                        return {
                            type: 'http/status',
                            error: true,
                            errorInfo: JSONError[res.data.code],
                            ratelimit: true
                        }
                    }
                    // this.gocheLibrary.gocheClient.heartbeart.requests++
                })
                .catch(resError => {
                   
                    if (resError.status === 200) {
                      /**
                       * No code ...
                       */
                   
                    } else {
                      
                        if (typeof resError.response === 'object') {
                            if (typeof resError.response.data === 'object') {
                                response({
                                    type: 'http-external',
                                    error: true,
                                    errorInfo: JSONError[resError.response.data.code]
                                })
                            }
                        } else {
                            response({
                                type: 'http-external',
                                error: true,
                                errorInfo: resError
                            })
                        }
                    }
                })
        }
 
     
    }
    async postRequest(path, response, data) {
    
        return axios.post(`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`, data, {
            headers: {
                Authorization: `Bot ${this.gocheLibrary.token}`,
                'User-Agent': 'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
                'Content-Type': 'application/json',
                'X-RateLimit-Precision': 'millisecond'
            },
        })
        .then(res => {
                    
            if (res.status === 429) {
                this.gocheLibrary.gocheClient.heartbeart.ratelimit++
                response({
                    error: true,
                    errorInfo: RequestError[res.status],
                    ratelimit: true
                })
                return {
                    type: 'http',
                    error: true,
                    errorInfo: RequestError[res.status],
                    ratelimit: true
                }
            }
            if (res.status < 205) {
                response(res.data)
            } else {
        
                if (typeof res.data.code === 'number') {
                    response({
                        type: 'http/jsonerror/statuscode',
                        error: true,
                        errorInfo: JSONError[res.data.code],
                        ratelimit: true
                    })
                } else {
                    response({
                        type: 'http/statuscode',
                        error: true,
                        errorInfo: res.status,
                        ratelimit: true
                    })
                }
                return {
                    type: 'http/status',
                    error: true,
                    errorInfo: JSONError[res.data.code],
                    ratelimit: true
                }
            }
            // this.gocheLibrary.gocheClient.heartbeart.requests++
        })
        .catch(resError => {
           
            if (resError.status === 200) {
              /**
               * No code ...
               */
           
            } else {
              
                if (typeof resError.response === 'object') {
                    if (typeof resError.response.data === 'object') {
                        response({
                            type: 'http-external',
                            error: true,
                            errorInfo: JSONError[resError.response.data.code]
                        })
                    }
                } else {
                    response({
                        type: 'http-external',
                        error: true,
                        errorInfo: resError
                    })
                }
            }
        })
        
    }

    async getRequest(path, response, data) {
        return axios.get(`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`, {
            headers: {
                Authorization: `Bot ${this.gocheLibrary.token}`,
                'User-Agent': 'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
                'Content-Type': 'application/json',
                'X-RateLimit-Precision': 'millisecond'
            }
        })
        .then(res => {
                    
            if (res.status === 429) {
                this.gocheLibrary.gocheClient.heartbeart.ratelimit++
                response({
                    error: true,
                    errorInfo: RequestError[res.status],
                    ratelimit: true
                })
                return {
                    type: 'http',
                    error: true,
                    errorInfo: RequestError[res.status],
                    ratelimit: true
                }
            }
            if (res.status < 205) {
                response(res.data)
            } else {
        
                if (typeof res.data.code === 'number') {
                    response({
                        type: 'http/jsonerror/statuscode',
                        error: true,
                        errorInfo: JSONError[res.data.code],
                        ratelimit: true
                    })
                } else {
                    response({
                        type: 'http/statuscode',
                        error: true,
                        errorInfo: res.status,
                        ratelimit: true
                    })
                }
                return {
                    type: 'http/status',
                    error: true,
                    errorInfo: JSONError[res.data.code],
                    ratelimit: true
                }
            }
            // this.gocheLibrary.gocheClient.heartbeart.requests++
        })
        .catch(resError => {
           
            if (resError.status === 200) {
              /**
               * No code ...
               */
           
            } else {
              
                if (typeof resError.response === 'object') {
                    if (typeof resError.response.data === 'object') {
                        response({
                            type: 'http-external',
                            error: true,
                            errorInfo: JSONError[resError.response.data.code]
                        })
                    }
                } else {
                    response({
                        type: 'http-external',
                        error: true,
                        errorInfo: resError
                    })
                }
            }
        })
    }
}