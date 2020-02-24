const fs = require('fs');
const jschardet = require('jschardet');

module.exports = function (file) {
	const result = jschardet.detect(fs.readFileSync(file));
	return {
		encoding: result.encoding,
		confidence: result.confidence * 100
	};
}