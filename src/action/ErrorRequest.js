/**
 * Sometimes the errorInfo output return can result in Error or Object.
 */
module.exports = class ErrorRequest {
	constructor(data) {
		this.type = data.type;
		this.error = data.error;
		this.errorInfo = data.errorInfo;
	}
};
