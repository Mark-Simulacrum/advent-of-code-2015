let fs = require("fs");

let data = fs.readFileSync("./data").toString();

let codeCharacters = 0;
let encodedCharacters = 0;

data.split("\n").forEach(line => {
	codeCharacters += line.length;

	const encodedLine = line
		.replace(/\\/g, "\\\\")
		.replace(/"/g, "\\\"");

	encodedCharacters += encodedLine.length + 2;
});

console.log(codeCharacters, encodedCharacters);
console.log(encodedCharacters - codeCharacters);
