const fs = require('fs');
const JSFuck = require('jscrewit');
const path = require('path');

const invisibleMap = {
	'!': ' ',
	'(': '­',
	')': '​',
	'+': ' ',
	'[': 'ㅤ',
	']': ' ',
};

function encode(input, output) {
	const jsf = JSFuck.encode(fs.readFileSync(path.resolve(process.cwd(), input)).toString());
	const encoded = jsf.replace(/./g, (char) => invisibleMap[char] || char);

	fs.writeFileSync(path.resolve(process.cwd(), output), encoded);
}

function decode(input) {
	input = fs.readFileSync(path.resolve(process.cwd(), input)).toString();
	const decoded = input.replace(/./g, (char) => {
		for (const key in invisibleMap) {
			if (invisibleMap[key] === char) {
				return key;
			}
		}
		return char;
	});

	eval(decoded);
}

if (process.argv.includes('--encode')) {
	encode(process.argv[process.argv.findIndex(arg => arg === '--encode') + 1], (process.argv.includes('--output') ? process.argv[process.argv.findIndex(arg => arg === '--output') + 1] : (process.argv.includes('-o') ? process.argv[process.argv.findIndex(arg => arg === '-o') + 1] : 'notSpecified.exe')));
}

if (process.argv.includes('--decode')) {
	decode(process.argv[process.argv.findIndex(arg => arg === '--decode') + 1]);
}

/* const encoded = jsf.replaceAll('!', invisibleMap['!']).replaceAll('(', invisibleMap['(']).replaceAll(')', invisibleMap[')']).replaceAll('+', invisibleMap['+']).replaceAll('[', invisibleMap['[']).replaceAll(']', invisibleMap[']']);
const decoded = invisibleMap.ke;
console.log('Encoded:', encoded);
console.log('Decoded:', decoded);*/