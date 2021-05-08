const ActionManager = require('./ActionManager');

module.exports = class MethodAction extends ActionManager {
	constructor() {
		this.onData = function (data) {};
		this.onError = function (data) {};
	}
};
