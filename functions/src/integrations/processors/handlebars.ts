const Handlebars = require('handlebars');

export const handlebarProcessor = (source: string, data): string => {
	if (!source) return '';

	const template = Handlebars.compile(source);

	return template(data);
};
