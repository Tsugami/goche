const WebSocket = require("ws")

module.exports = class GochePacketManager {
	constructor() {
		this.url = ''
		this.secret = ''
	
		this.ws = null
	}

	createUUID() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, 
			(uuid) => {
			var a = Math.random() * 16 | 0, result = uuid == 'x' ? a : 
			(a & 0x3 | 0x8);
			return result.toString(16);
		  })
	}

	setURL(url) {
		this.url = url
		return this
	}

	setToken(secret) {
		this.secret = secret
		return this
	}
	createRequest(method, token, endpoint, data) {
		const id =  this.createUUID()
		this.ws.send(JSON.stringify({
			type: 0,
            requestID: id,
			token: token.replace('Bot ', ''),
            method: method,
            endpoint: endpoint,
            data: JSON.stringify(data)
		}))
	
		return {
			type: 0,
            requestID: id,
            method: method,
            endpoint: endpoint,
            data: JSON.stringify(data)
		}
	}
	getRequest(uuid) {
	
		return new Promise(dataPromise => {
			const r = this.ws
			.on('message', (data) => {
				
				try {
					const dataJSON = JSON.parse(data)
				
					if (dataJSON.preparing === true) {
						return;
					}
				
					dataJSON.statusCode = parseInt(`${dataJSON.statusCode}`.replace( /(\D+)/g, ''))
					try {
						dataJSON.data = dataJSON.data[0]
						dataJSON.data.statusCode = parseInt(`${dataJSON.statusCode}`.replace( /(\D+)/g, ''))
	
					} catch (ignore) {
					
						dataJSON.data = {
							statusCode: 0
						}
					}
				
					if (dataJSON.requestID === uuid) {
						
						dataPromise(dataJSON)
						
					}
				} catch (ignore) {

				}
				
			})
	
			
		})
	}


    build() {
        this.ws = new WebSocket(`ws://${this.url}/?id=${this.secret}`)  
		this.ws.on('upgrade', () => console.log('[GochePacketManager] Outdated version!'))
		this.ws.on('error', (err) => {
			console.error('[GochePacketManager] There was a problem with the API')
			console.log(err)
		})
		this.ws.on('close', (code, reason) => console.error(`[GochePacketManager] Closing the connection! (CODE ~>[${code}] ${reason})`))
        return this;
    }
}
