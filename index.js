const chalk = require('chalk');
const adapters = require('./adapters');
const isWindows = process.platform === "win32";

const tests = [
	{
		type: 'ansi',
		file: './tests/ansi.txt',
		name: 'ANSI',
		except: ['Windows-1251', 'Windows-1252'],
	},
	{
		type: 'unicode',
		file: './tests/unicode.txt',
		name: 'Unicode',
		except: ['UTF-16LE'],
	},
	{
		type: 'unicode_big_endian',
		file: './tests/unicode_big_endian.txt',
		name: 'Unicode Big Endian',
		except: ['UTF-16BE'],
	},
	{
		type: 'utf8',
		file: './tests/utf8.txt',
		name: 'UTF-8',
		except: ['UTF-8-BOM', 'UTF-8'],
	},
	{
		type: 'utf8_wo_bom',
		file: './tests/utf8clean.txt',
		name: 'UTF-8 without BOM',
		except: ['UTF-8'],
	},
	{
		type: 'cp1251',
		file: './tests/windows1251.txt',
		name: 'Windows 1251',
		except: ['Windows-1251'],
	},
    {
		type: 'test_file',
		file: './tests/123.txt',
		name: 'Test file (Windows-1251)',
		except: ['Windows-1251'],
	},
	{
		type: 'test_file2',
		file: './tests/345.txt',
		name: 'Test file 2 (Windows-1251)',
		except: ['Windows-1251'],
	}
];

const libs = [
	'chardet',
	'charset-detector',
	'detect-charset',
	'jschardet',
];

 // NOT FOR WINDOWS!
if (!isWindows) {
	libs.push('detect-character-encoding');
}

libs.forEach((lib) => {
	console.log(`** Tesing module - ${lib} **`);
	tests.forEach((test) => {
		try {
			const encodingInfo = adapters[lib](test.file);
			const {
				encoding,
				confidence,
			} = encodingInfo;
			const isValid = test.except.find(item => (String(item).toLowerCase() === String(encoding).toLowerCase()));
			console.log(`Testing ${test.name}. Result encoding is ${encoding} (${confidence.toFixed(2)}%), expected ${test.except.join(' or ')}, so test result: ${isValid ? chalk.green('PASSED') : chalk.red('FAILED')}`);
		} catch (e) {
			console.error(e);
		}
	});
	console.log('******************************');
});
