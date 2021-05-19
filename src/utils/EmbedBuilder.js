module.exports = class EmbedBuilder {
	constructor() {
		this.embed = {
			fields: [],
		};
	}

	title(title) {
		if (title.length > 256) {
			throw Error(`Maximum letters are 256. There are {${title.length}} letters`)
		}
		if (title.length >= 0 && title === ' ') {
			throw Error('That title is empty')
		}
		this.embed.title = title;
		return this;
	}

	description(description) {
		if (description.length > 2048) {
			throw Error(`Maximum letters are 2048. There are {${description.length}} letters`)
		}
		if (description.length >= 0 && description === ' ') {
			throw Error('That description is empty')
		}
		this.embed.description = description;
		return this;
	}

	url(url) {
		this.embed.url = url;
		return this;
	}

	timestamp(timestamp) {
		this.embed.timestamp = timestamp;
		return this;
	}

	color(color) {
		this.embed.color = color;
	}

	author(author) {
		this.embed.author = author;
	}

	field(name, value, inline) {
		if (name.length > 256) {
			throw Error(`Maximum letters are 256. There are {${name.length}} letters (field.Args[name])`)
		}
		if (name.length >= 0 && title === ' ') {
			throw Error('That name is empty (field.Args[name])')
		}


		if (value.length > 256) {
			throw Error(`Maximum letters are 256. There are {${value.length}} letters (field.Args[value])`)
		}
		if (value.length >= 0 && title === ' ') {
			throw Error('That value is empty (field.Args[value])')
		}


		if (typeof inline == 'boolean') {
			throw Error('That value is empty (field.Args[value])')
		}


		this.embed.fields.push({
			name: name,
			value: value,
			inline: inline,
		});
		return this;
	}

	resetData(data) {
		this.embed = {}; // reset data
		this.embed = data;
		return this;
	}

	builder() {
		if (this.embed.fields.length > 25) {
			throw Error(`Maximum fields are 25. There are {${this.embed.fields.length}} letters (builder.Args[fields])`) 
		} 
		return this.embed;
	}
};
