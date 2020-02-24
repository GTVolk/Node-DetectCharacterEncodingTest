const fs = require('fs');
const detect = require('charset-detector');

module.exports = function (file) {
	const result = detect(fs.readFileSync(file));
	if (Array.isArray(result) && result.length) {
		const item = result[0];
		return {
			encoding: item.charsetName,
			confidence: item.confidence,
		};
	}
	
	return {
		encoding: null,
		confidence: null,
	};
}