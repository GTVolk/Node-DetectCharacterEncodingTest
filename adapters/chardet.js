const chardet = require('chardet');

module.exports = function (file) {
	const result = chardet.detectFileAllSync(file);
	if (Array.isArray(result) && result.length) {
		const item = result[0];
		return {
			encoding: item.name,
			confidence: item.confidence,
		};
	}
	
	return {
		encoding: null,
		confidence: null,
	};
}