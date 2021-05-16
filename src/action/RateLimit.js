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

	
	nextQueue(id, time) {
		
		setTimeout(() => {
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
						this.gocheLibrary.httpManager.otherRequest('patch', requestInfo.args[0], requestInfo.args[1], requestInfo.args[2], requestInfo.args[3])
						this.deleteQueue(id)
					break;
					case 'put':
						this.gocheLibrary.httpManager.postRequest('put', requestInfo.args[0], requestInfo.args[1], requestInfo.args[2], requestInfo.args[3])
						this.deleteQueue(id)
					break;
					case 'delete':
						this.gocheLibrary.httpManager.postRequest('delete', requestInfo.args[0], requestInfo.args[1], requestInfo.args[2], requestInfo.args[3])
						this.deleteQueue(id)
					break;
				}	
				
			}
		}, time) // Well, I will transform in seconds ...
	}

	addQueue(method, time, ...objectFunction) {
		this.rateLimit++
		this.number++
		const timeReplace = `${time}`.replace(/(\.)/g, '')
		this.otherRequest.set(this.number, {
			time: timeReplace,
			method: method,
			args: objectFunction
		});
		this.nextQueue(this.number, Number(timeReplace))
	}

	deleteQueue(id) {
		return this.otherRequest.delete(id);
	}


};
