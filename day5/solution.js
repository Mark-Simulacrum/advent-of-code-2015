let input = require("fs").readFileSync("./data").toString();

function isNice(string) {
	// Part 1
	return /([aeiou].*?){3}/.test(string) && /(.)\1/.test(string) && !(/ab|cd|pq|xy/.test(string));

	// Part 2
	// return /(..).*?\1/.test(string) && /(.).\1/.test(string);
}

let niceStrings = input
	.split("\n")
	.filter(line => isNice(line));

console.log("Nice String amount:", niceStrings.length);