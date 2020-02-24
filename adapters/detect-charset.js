const fs = require('fs');
const detect = require('detect-charset');

module.exports = function (file) {
	const result = detect(fs.readFileSync(file));
	return {
		encoding: result,
		confidence: 100,
	};
}