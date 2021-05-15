const Intents = require('../utils/Intents');

module.exports = class IntentsManager {
	constructor() {
		this.intentsList = Intents.intents;
		this.intentsSelected = [];
		this.intents = 0;
	}

	/**
	 *
	 * @param {*} intents
	 * You just need to inform the name of the intents in having to disable it through the Boolean. That there is no need!
	 */
	add(intents) {
		if (typeof this.intentsList[intents] === 'number') {
			/**
			 * This to avoid multiplying intents that can cause disconnect in the websocket
			 */
			if (
				typeof this.intentsSelected[intents] ===
				'undefined'
			) {
				this.intentsSelected.push(
					this.intentsList[intents]
				);
				this.intents += this.intentsList[
					intents
				];
			}
		}
	}
};
