let crypto = require("crypto");

function getMD5HexHash(input) {
	return crypto.createHash('md5').update(input).digest('hex');
}

let secretKey = "yzbqklnj";

let i = 0;
let currentHash = "";

while (!currentHash.startsWith("0".repeat(5))) {
	i++;
	currentHash = getMD5HexHash(secretKey + i);
}

console.log("Minimum value of n to start with 5 zeros:", i);

i = 0;
currentHash = "";
while (!currentHash.startsWith("0".repeat(6))) {
	i++;
	currentHash = getMD5HexHash(secretKey + i);
}

console.log("Minimum value of n to start with 6 zeros:", i);
