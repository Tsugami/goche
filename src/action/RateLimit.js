const GocheLibrary = require('../GocheLibrary');
const RequestControlAction = require('./RequestControlAction');

module.exports = class RateLimit {
	constructor(requestConfig = new RequestControlAction(), gocheLibrary = new GocheLibrary()) {
		this.channel = new Map();
		this.requestConfig = requestConfig;
		this.gocheLibrary = gocheLibrary;
		this.otherRequest = new Map();
		this.global = false;
		this.seconds = 1;
		this.limit = this.requestConfig.queue;
		this.rateLimit = 0;
		this.requestSend = 0;
		this.number = 0;
		this.recovery = false;
		this.setTime = null;
	}

	sendWarnRequest(output, data) {
		const error = {
			type: 'ratelimit-manager',
			error: true,
			errorInfo: {
				requestIgnored: true,
				message: 'This request was ignored due to the limit that was configured in Goche.',
				dataRequest: data
			}
		}

		if (typeof output === 'function') {
			output(error);
		}
	}
	
	nextQueue(id, time) {
		if (this.global === true) {
			return;
		}
		setTimeout(() => {
			if (this.global === true) {
				return;
			}
			if (this.otherRequest.length === 0) {
		
				this.recovery = false
			} else {
				this.recovery = true
				const requestInfo = this.otherRequest.get(id)
	
				switch(requestInfo.method) {
					case 'get':
						this.gocheLibrary.httpManager.getRequest(requestInfo.args[0], requestInfo.args[1], requestInfo.args[2])
						this.deleteQueue(id)
					break;
					case 'post':
						this.gocheLibrary.httpManager.postRequest(requestInfo.args[0], requestInfo.args[1], requestInfo.args[2])
						this.deleteQueue(id)
					break;
					case 'patch':
						this.gocheLibrary.httpManager.otherRequest('patch', requestInfo.args[0], requestInfo.args[1], requestInfo.args[2])
						this.deleteQueue(id)
					break;
					case 'put':
						this.gocheLibrary.httpManager.otherRequest('put', requestInfo.args[0], requestInfo.args[1], requestInfo.args[2])
						this.deleteQueue(id)
					break;
					case 'delete':
						this.gocheLibrary.httpManager.otherRequest('delete', requestInfo.args[0], requestInfo.args[1], requestInfo.args[2])
						this.deleteQueue(id)
					break;
				}	
			}
		}, time + 100) // Well, I will transform in seconds ...
	}
	requestLimit(data) {
		if (this.global === true) {
			return;
		}
		switch(data.method) {
			case 'get':
				this.sendWarnRequest(data.args[2], data)
			break;
			case 'post':
				this.sendWarnRequest(data.args[2], data)
		
			break;
			case 'patch':
				this.sendWarnRequest(data.args[1], data)
			break;
			case 'put':
				this.sendWarnRequest(data.args[1], data)
			break;
			case 'delete':
				this.sendWarnRequest(data.args[1], data)
			break;
		}	
	}

	addQueue(method, time, ...objectFunction) {
		this.rateLimit++
		this.number++
		if (this.global === true) {
			return;
		}
		if (this.requestConfig.limitQueue === false) {
			const timeReplace = `${time}`.replace(/(\.)/g, '')
			this.otherRequest.set(this.number, {
				time: timeReplace,
				method: method,
				args: objectFunction
			});
			this.nextQueue(this.number, Number(timeReplace))
			return;
		}
		if (this.otherRequest.size > this.limit) {
			const timeReplace = `${time}`.replace(/(\.)/g, '')
			this.requestLimit({
				time: timeReplace,
				method: method,
				args: objectFunction
			})
		} else {
			const timeReplace = `${time}`.replace(/(\.)/g, '')
			this.otherRequest.set(this.number, {
				time: timeReplace,
				method: method,
				args: objectFunction
			});
			this.nextQueue(this.number, Number(timeReplace))
		}
	}
	
	rateLimiteGlobal() {
		this.global = true
		console.warn(`Global Goche Rate Limit:\nDiscord blocked requests for an hour or for more hours because of high, high requests that are created for 50/2 seconds\nDateNow: ${Date.now()}\nRate Limit Docs: https://discord.com/developers/docs/topics/rate-limits`)
	}

	deleteQueue(id) {
		if (this.global === true) {
			return;
		}
		return this.otherRequest.delete(id);
	}


};
