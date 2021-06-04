const GocheLibrary = require('../GocheLibrary');
const Bucket = require('./Bucket');
const RequestBucket = require('./RequestBucket');
const RequestControlAction = require('./RequestControlAction');

module.exports = class RequestManager {
	constructor(requestConfig = new RequestControlAction(), gocheLibrary = new GocheLibrary()) {
		this.channel = new Map();
		this.requestConfig = requestConfig;
		this.gocheLibrary = gocheLibrary;
		this.otherRequest = new Map();
		this.requestBucket = new RequestBucket();
		this.global = false;
		this.seconds = 1;
		this.limit = this.requestConfig.queue;
		this.rateLimit = 0;
		this.requestSend = 0;
		this.number = 0;
		this.recovery = false;
		this.setTime = null;
		this.path = new Map()
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

	nextQueue(requestInfo) {

		const bucket = this.requestBucket.queue.get(requestInfo.args[0])
		if (this.global === true) {
			return;
		}
		switch(requestInfo.method) {
			case 'get':
				this.gocheLibrary.httpManager.getRequest(requestInfo.args[0], requestInfo.args[1], requestInfo.args[2])
			
				if (bucket.requests.length === 0) {
						this.requestBucket.deleteBucket(bucket.path)
				}
			
			break;
			case 'post':
				this.gocheLibrary.httpManager.postRequest(requestInfo.args[0], requestInfo.args[1], requestInfo.args[2])
	
				if (bucket.requests.length === 0) {
	
					this.requestBucket.deleteBucket(bucket.path)
			}
	
			break;
			case 'patch':
				this.gocheLibrary.httpManager.otherRequest('patch', requestInfo.args[0], requestInfo.args[1], requestInfo.args[2])
	
				if (bucket.requests.length === 0) {
					this.requestBucket.deleteBucket(bucket.path)
			}
	
			break;
			case 'put':
				this.gocheLibrary.httpManager.otherRequest('put', requestInfo.args[0], requestInfo.args[1], requestInfo.args[2])
		
				if (bucket.requests.length === 0) {
					this.requestBucket.deleteBucket(bucket.path)
			}
		
			break;
			case 'delete':
				this.gocheLibrary.httpManager.otherRequest('delete', requestInfo.args[0], requestInfo.args[1], requestInfo.args[2])

				if (bucket.requests.length === 0) {
					this.requestBucket.deleteBucket(bucket.path)
			}
			
			break;
		}	
	}
	requestLimit(data) {
		if (this.requestBucket.limit > 50) {
			return;
		}
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
		
		if (this.requestBucket.queue.get(objectFunction[0]) == null) {
			const bucket = this.requestBucket.addBucket(new Bucket(objectFunction[0], method))

			this.requestBucket.queue.get(objectFunction[0]).requests.push({
				method: method,
				args: objectFunction
			})
			setTimeout(() => {
				const bucket = this.requestBucket.queue.get(objectFunction[0])

				bucket.requests.map(r => {
					this.nextQueue(r)
				
				})
				
			}, `${time}`.replace(/(\.)/g, ''))
		} else {
			const bucket = this.requestBucket.queue.get(objectFunction[0])
			console.log(`Request added in Bucket ${bucket.requests.length}/100`)
			bucket.requests.push({
				method: method,
				args: objectFunction
			})
		}
		
	
	}

	identifyLimit(method, path) {
		const message = RegExp('messages', 'g')
		const member = RegExp('member', 'g')
		const reaction = RegExp('reaction|reactions', 'g')
		switch(method) {
			case 'post':
			
				if (!message.test(path)) {
					return {
						noLimit: false,
						limit: 5,
						seconds: 5 * 1000
					}
				}
			break;
			case 'patch':
			
				if (!member.test(path)) {
					return {
						noLimit: false,
						limit: 10,
						seconds: 10 * 1000 + 20
					}
				}
			break;
			case 'put':
			
				if (!reaction.test(path)) {
					return {
						noLimit: false,
						limit: 300,
						seconds: 300 * 1000 + 20
					}
				}
			break;
			case 'delete':
		
				if (!message.test(path)) {
					return {
						noLimit: false,
						limit: 5,
						seconds: 1 * 1000 + 20
					}
				}

			
				if (!reaction.test(path)) {
					return {
						noLimit: false,
						limit: 300,
						seconds: 300 * 1000 + 20
					}
				}
			break;
		}
		return {
			noLimit: true
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
