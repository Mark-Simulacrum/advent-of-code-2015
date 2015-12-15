let util = require("../util");

let input = require("fs").readFileSync("./data").toString();

let presentDimensions = input
	.split("\n")
	.map(present =>
		present.split("x")
		.map(dimension => parseInt(dimension, 10))
		.sort((a, b) => a - b)
	)
	.map(present => {
		return {
			l: present[0],
			w: present[1],
			h: present[2]
		};
	});

let wrappingNeeded = util.sum(presentDimensions.map(present =>
	present.l * present.w + // Area of smallest side
	2 * present.l * present.w +
	2 * present.w * present.h +
	2 * present.h * present.l
));

console.log("Sq. Ft. Wrapping Paper Needed:", wrappingNeeded);

let ribbonNeeded = util.sum(presentDimensions.map(present =>
	2 * present.l + 2 * present.w + // perimeter of smallest face, ribbon wrap
	present.l * present.w * present.h // cubic area, bow
));

console.log("Ft. Ribbon Needed:", ribbonNeeded);
