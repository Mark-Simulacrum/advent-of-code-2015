let fs = require("fs");
let _ = require("lodash");

let data = fs.readFileSync("./data").toString();

let parsedData = JSON.parse(data);

function getAllValues(object) {
	let values = _.values(object);

	for (let i = 0; i < values.length; i++) {
		if (typeof values[i] === "object") {
			values[i] = getAllValues(values[i]);
		}
	}

	if (!Array.isArray(object) && values.indexOf("red") >= 0) return [0];

	return values;
}

let values = getAllValues(JSON.parse(data));

console.log(values);

let numberValues = _.flattenDeep(values).filter(value => typeof value === "number");
console.log(numberValues);

console.log(numberValues.reduce((a,b) => a+b, 0));

