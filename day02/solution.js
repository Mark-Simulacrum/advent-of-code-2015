let util = require("../util");

let input = require("fs").readFileSync("./data").toString();

let presentDimensions = input
	.split("\n")
	.map(present =>
		present.split("x")
			.map(dimension => parseInt(dimension, 10))
			.sort((a, b) => a - b)
	);

let wrappingNeeded = util.sum(presentDimensions.map(present =>
	present[0] * present[1] + // Area of smallest side
	2 * present[0] * present[1] +
	2 * present[1] * present[2] +
	2 * present[2] * present[0]
));

console.log("Part 1:", wrappingNeeded);

let ribbonNeeded = util.sum(presentDimensions.map(present =>
	2 * present[0] + 2 * present[1] + // perimeter of smallest face, ribbon wrap
	present[0] * present[1] * present[2] // cubic area, bow
));

console.log("Part 2:", ribbonNeeded);
