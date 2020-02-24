const fs = require('fs');
const detect = require('detect-character-encoding');

module.exports = function (file) {
	const result = detect(fs.readFileSync(file));
	return result;
}