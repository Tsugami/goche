module.exports = {
	204: {
		description:
			'The request completed successfully but returned no content.',
	},
	304: {
		description:
			'The entity was not modified (no action was taken).',
	},
	400: {
		description:
			"The request was improperly formatted, or the server couldn't understand it.",
	},
	401: {
		description:
			'The Authorization header was missing or invalid.',
	},
	403: {
		description:
			'The Authorization token you passed did not have permission to the resource.',
	},
	500: {
		description:
			'There was not a gateway available to process your request. Wait a bit and retry.',
	},
};
