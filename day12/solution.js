let fs = require("fs");
let _ = require("lodash");

let data = fs.readFileSync("./data").toString();

let parsedData = JSON.parse(data);

function getAllValues(object, isPart2) {
	let values = _.values(object);

	for (let i = 0; i < values.length; i++) {
		if (typeof values[i] === "object") {
			values[i] = getAllValues(values[i], isPart2);
		}
	}

	if (isPart2 && (!Array.isArray(object) && values.indexOf("red") >= 0)) return [0];

	return _.flattenDeep(values).filter(v => typeof v === "number");
}

console.log("Part 1:", getAllValues(parsedData, false).reduce((a,b) => a + b));
console.log("Part 2:", getAllValues(parsedData, true).reduce((a,b) => a + b));
