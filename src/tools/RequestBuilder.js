const GocheInfo = require("../GocheInfo")
const httpCreate = require('https')
const url = require('url')

module.exports = class RequestBuilder {
    constructor(method, path, headers, data) {
        this.url = GocheInfo.DISCORD_URL
        this.method = `${method}`.toLocaleUpperCase();
        this.path = `${`/api/v${GocheInfo.DISCORD_API}/${encodeURIComponent(path)}`}`;
 
        this.headers = headers;
        this.data = data;
        this.closed = false;
        this.loadingData = 0;
        this.startLoading = Date.now();
        this.type = 'unknown';
        this.endLoading = 0;
        this.end = false;
    }

    /**
     * ### Builder Request
     * This method was prepared to send data.
     * @param {*} data 
     * @returns 
     */
    builder(data) {
        const isObject = typeof data === 'object' ? 'isObject' : 'notIsObject'
        return new Promise(resolvePromise => {
            try {    
                const requestNew = httpCreate.request({
                    host: this.url,
                    path: this.path,
                    headers: this.headers,
                    method: this.method,
                }, res => {
                    const bufferDataArray = []
                    res.on('data', (bufferData) => {
                        const bufferMap = bufferData.toJSON().data
                        bufferMap.map(e => {
                            bufferDataArray.push(e)
                        })          
                    })

                    res.on('error', (error) => {
                        res.removeAllListeners()
                        throw error;
                    })

                    res.on('close', () => {
                        res.removeAllListeners()
                        this.closed = true
                    })

                    res.on('end', () => {
                        res.removeAllListeners()
                        this.end = true
                        this.endLoading = Date.now()
                        try {
                        this.type = 'json'
                        resolvePromise({
                            statusCode: res.statusCode,
                            data: JSON.parse(Buffer.from(bufferDataArray).toString())
                        })
                        bufferDataArray.map(e => bufferDataArray.pop())
                        } catch (ThisisnotJSON) {
                        resolvePromise({
                            statusCode: res.statusCode,
                            data: Buffer.from(bufferDataArray).toString()
                        })
                        bufferDataArray.map(e => bufferDataArray.pop())
                        }
                    })
                })
                requestNew.write(Buffer.from(`${isObject === 'isObject' ? JSON.stringify(data) : data}`))
                requestNew.end()
            } catch (e) {
                console.log(e)
            }
            
        }) 
    }

    create() {
        return new Promise(resolvePromise => {
            try {
                httpCreate.request({
                    host: this.url,
                    path: this.path,
                    headers: this.headers,
                    method: this.method,
                },  res => {
                    const bufferDataArray = []
                    res.on('data', (bufferData) => {
                        res.removeAllListeners()
                        const bufferMap = bufferData.toJSON().data
                        bufferMap.map(e => {
                            bufferDataArray.push(e)
                            bufferDataArray.map(e => bufferDataArray.pop())
                        })          
                    })
    
                    res.on('error', (error) => {
                        res.removeAllListeners()
                        throw error;
                    })
    
                    res.on('close', () => {
                        res.removeAllListeners()
                        this.closed = true
                    })
    
                    res.on('end', () => {
                        res.removeAllListeners()
                        this.end = true
                        this.endLoading = Date.now()
                        try {
                        this.type = 'json'
                           resolvePromise({
                               statusCode: res.statusCode,
                               data: JSON.parse(Buffer.from(bufferDataArray).toString())
                           })
                           bufferDataArray.map(e => bufferDataArray.pop())
                        } catch (ThisisnotJSON) {
                           resolvePromise({
                               statusCode: res.statusCode,
                               data: Buffer.from(bufferDataArray).toString()
                           })
                           bufferDataArray.map(e => bufferDataArray.pop())
                        }
                    })
                }).end()
            } catch (e) {
                console.log(e)
            }
        }) 
    }   
}