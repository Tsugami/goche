const Bucket = require('../action/Bucket');
const RateLimit = require('../action/RequestManager');
const JSONError = require('../error/JSONError');
const RequestError = require('../error/RequestError');
const GocheInfo = require('../GocheInfo');
const GocheLibrary = require('../GocheLibrary');
const RequestBuilder = require('../tools/RequestBuilder');

module.exports = class HttpAPI {
    constructor(gocheLibrary = new GocheLibrary()) {
        this.requestCreated = 0;
        this.gocheLibrary = gocheLibrary;
		this.ratelimit = new RateLimit(this.gocheLibrary.requestConfigBuilder, this.gocheLibrary);
    }

    otherRequest(method, path, response, data) {
        switch (method) {
            case 'delete':
                return new RequestBuilder('DELETE', path, {
                    Authorization: `Bot ${this.gocheLibrary.token}`,
				    'User-Agent': 'Discord Bot (Goche Library, 0.0.1)',
			        'Content-Type': 'application/json',
                    'X-RateLimit-Precision': 'millisecond',
                }, data, this.gocheLibrary).builder(data).then(res => {
                    if (res.statusCode === 429) {
                        if (!res.data.global) {
                            this.ratelimit.addQueue(method, res.data.retry_after, path, response, data)
                        } else {
                            this.ratelimit.rateLimiteGlobal()
                        }
                    } else {
                        if (typeof response === 'function') {
                            if (typeof res.data === 'object') {
                                if (res.data.messsage === 'You are being blocked from accessing our API temporarily due to exceeding our rate limits frequently. Please read our docs at https://discord.com/developers/docs/topics/rate-limits to prevent this moving forward.') {
                                    this.ratelimit.rateLimiteGlobal()
                                    return
                                }
                                res.data.error = false;
                            }

                            if (typeof res.data.code === 'number') {
                                res.data.error = true;
                                response({
                                    errorCode: 'http/statuscode',
                                    data: res.data
                                })
                                return
                            }

                            res.data.error = false;
                            response(res.data)
                        }
                    }
                })
            break;
            case 'patch':
                return new RequestBuilder('PATCH', path, {
                    Authorization: `Bot ${this.gocheLibrary.token}`,
				    'User-Agent': 'Discord Bot (Goche Library, 0.0.1)',
			        'Content-Type': 'application/json',
                    'X-RateLimit-Precision': 'millisecond',
                }, data, this.gocheLibrary).builder(data).then(res => {
                    if (res.statusCode === 429) {
                        if (!res.data.global) {
                            this.ratelimit.addQueue(method, res.data.retry_after, path, response, data)
                        } else {
                            this.ratelimit.rateLimiteGlobal()
                        }
                    } else {
                        if (typeof response === 'function') {
                            if (typeof res.data === 'object') {
                                if (res.data.messsage === 'You are being blocked from accessing our API temporarily due to exceeding our rate limits frequently. Please read our docs at https://discord.com/developers/docs/topics/rate-limits to prevent this moving forward.') {
                                    this.ratelimit.rateLimiteGlobal()
                                    return
                                }
                                res.data.error = false;
                            }

                            if (typeof res.data.code === 'number') {
                                res.data.error = true;
                                response({
                                    errorCode: 'http/statuscode',
                                    data: res.data
                                })
                                return
                            }

                            res.data.error = false;
                            response(res.data)
                        }
                    }
                })
            break;
            case 'put':
              
                return new RequestBuilder('PUT', path, {
                    Authorization: `Bot ${this.gocheLibrary.token}`,
				    'User-Agent': 'Discord Bot (Goche Library, 0.0.1)',
			        'Content-Type': 'application/json',
                    'X-RateLimit-Precision': 'millisecond',
                }, data, this.gocheLibrary).builder(data).then(res => {     
                    if (res.statusCode === 429) {
                        if (!res.data.global) {

                            this.ratelimit.addQueue(method, res.data.retry_after, path, response, data)
                        } else {
                            this.ratelimit.rateLimiteGlobal()
                        }
                        this.ratelimit.addQueue(method, res.data.retry_after, path, response, data)
                    } else {
                       
                        if (typeof response === 'function') {
                            if (typeof res.data === 'object') {
                                if (res.data.messsage === 'You are being blocked from accessing our API temporarily due to exceeding our rate limits frequently. Please read our docs at https://discord.com/developers/docs/topics/rate-limits to prevent this moving forward.') {
                                    this.ratelimit.rateLimiteGlobal()
                                    return
                                }

                                if (typeof res.data.code === 'number') {
                                    res.data.error = true;
                                    response({
                                        errorCode: 'http/statuscode',
                                        data: res.data
                                    })
                                    return
                                }


                                res.data.error = false;
                            }
                            res.data.error = false;
                            response(res.data)
                        }
                    }
                })
            break;
        }
    }

    postRequest(path, response, data, rateLimit) {
  
        new RequestBuilder('POST', path, {
            Authorization: `Bot ${this.gocheLibrary.token}`,
            'User-Agent': 'Discord Bot (Goche Library, 0.0.1)',
            'Content-Type': 'application/json',
            'X-RateLimit-Precision': 'millisecond',
        }, data, this.gocheLibrary)
        .builder(data)
    
        .then(res => {
           
            if (this.requestBucket.queue.get(objectFunction[0]) == null) {
               this.ratelimit.requestBucket.addBucket(new Bucket(path, 'post').requests)
            } else {
                switch(rateLimit) {
                    case undefined:
                    case null:
                        this.ratelimit.requestBucket.queue.get(path)
                        this.ratelimit.addQueue('post', this.ratelimit.path(p), path, response, data)
                }
            }
           
            
            if (this.ratelimit.requestBucket.queue.get(path) === null) {
     
                this.ratelimit.requestBucket.queue.get(path).requests.pop()
            }
            if (res.statusCode === 429) {
                if (!res.data.global) {
                    this.ratelimit.addQueue('post', res.data.retry_after, path, response, data)
                } else {
                    this.ratelimit.rateLimiteGlobal()
                }
            } else {
                this.ratelimit.requestBucket.queue.get(path).requests.pop()
                if (typeof response === 'function') {
                   
                    if (typeof res.data === 'object') {
                        if (res.data.messsage === 'You are being blocked from accessing our API temporarily due to exceeding our rate limits frequently. Please read our docs at https://discord.com/developers/docs/topics/rate-limits to prevent this moving forward.') {
                            this.ratelimit.rateLimiteGlobal()
                            return
                        }
                        res.error = false;
                        res.data.error = false;
                    }

                    if (typeof res.data.code === 'number') {
                        res.error = true;
                     
                        const dataError = typeof res.data === 'undefined' ? res : res.data;

                         
                        const errorInfo = JSONError[dataError.code];

                        response({
                            errorCode: 'http/statuscode',
                            data: {
                                api: errorInfo,
                                error: true
                            }
                        })
                        return
                    }

                    res.error = false;
                    res.data.error = false;
                    response(res.data)
                }
            }
        })
        .catch(error => console.log(error))
    }

    getRequest(path, response, data) {
        return new RequestBuilder('GET', path, {
            Authorization: `Bot ${this.gocheLibrary.token}`,
            'User-Agent': 'Discord Bot (Goche Library, 0.0.1)',
            'Content-Type': 'application/json',
            'X-RateLimit-Precision': 'millisecond',
        }, {}, this.gocheLibrary).create().then(res => {
      
            if (res.statusCode === 429) {
                if (!res.data.global) {
                    this.ratelimit.addQueue('get', res.data.retry_after, path, response, data)
                } else {
                    this.ratelimit.rateLimiteGlobal()
                }
            } else {
                if (typeof response === 'function') {
                    if (typeof res.data === 'object') {
                        if (res.data.messsage === 'You are being blocked from accessing our API temporarily due to exceeding our rate limits frequently. Please read our docs at https://discord.com/developers/docs/topics/rate-limits to prevent this moving forward.') {
                            this.ratelimit.rateLimiteGlobal()
                            return
                        }

                        if (typeof res.data.code === 'number') {
                            res.data.error = true;
                            response({
                                errorCode: 'http/statuscode',
                                data: res.data
                            })
                            return
                        }

                        res.data.error = false;
                    }
                    res.data.error = false;
                    response(res.data)
                }
            }
        })
    }
    
}