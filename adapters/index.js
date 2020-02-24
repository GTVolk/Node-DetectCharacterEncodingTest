const isWindows = process.platform === "win32";

module.exports = {
	'chardet': require('./chardet'),
	'charset-detector': require('./charset-detector'),
	'detect-charset': require('./detect-charset'),
	'jschardet': require('./jschardet'),
};

 // NOT FOR WINDOWS!
if (!isWindows) {
	module.exports['detect-character-encoding'] = require('./detect-character-encoding');
}