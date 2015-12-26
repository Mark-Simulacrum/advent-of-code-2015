let crypto = require("crypto");

function getMD5HexHash(input) {
	return crypto.createHash('md5').update(input).digest('hex');
}

let secretKey = "yzbqklnj";

let i = 0;
let currentHash = "";

let zeros5 = "0".repeat(5);
let zeros6 = "0".repeat(6);

while (!currentHash.startsWith(zeros5)) {
	i++;
	currentHash = getMD5HexHash(secretKey + i);

	if (currentHash.startsWith(zeros6)) {
		console.log("Part 2:", i);
	}
}

console.log("Part 1:", i);

while (!currentHash.startsWith(zeros6)) {
	i++;
	currentHash = getMD5HexHash(secretKey + i);
}

console.log("Part 2:", i);
