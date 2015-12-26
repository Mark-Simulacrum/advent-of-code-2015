let input = require("fs").readFileSync("./data").toString();

function isNice(part2) {
	if (!part2) {
		return line => /([aeiou].*?){3}/.test(line) && /(.)\1/.test(line) && !(/ab|cd|pq|xy/.test(line));
	} else {
		return line => /(..).*?\1/.test(line) && /(.).\1/.test(line);
	}
}

console.log("Part 1:", input.split("\n").filter(isNice(false)).length);
console.log("Part 2:", input.split("\n").filter(isNice(true)).length);
