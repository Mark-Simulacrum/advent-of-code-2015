let fs = require("fs");

let data = fs.readFileSync("/tmp/data").toString();

let lights = {};

function getStrPos(x, y) {
	return `${x},${y}`;
}

function toggle(x, y) {
	lights[getStrPos(x, y)] += 2;
}

function turnOn(x, y) {
	lights[getStrPos(x, y)] += 1;
}

function turnOff(x, y) {
	lights[getStrPos(x, y)] -= 1;
	if (lights[getStrPos(x, y)] <= 0) delete lights[getStrPos(x, y)];
}

let instructions = data.split("\n");

instructions.forEach((instruction, index) => {
	let appliedFunction;

	if (instruction.startsWith("turn on")) {
		appliedFunction = turnOn;

		instruction = instruction.substr(8);
	} else if (instruction.startsWith("turn off")) {
		appliedFunction = turnOff;

		instruction = instruction.substr(9);
	} else if (instruction.startsWith("toggle")) {
		appliedFunction = toggle;

		instruction = instruction.substr(7);
	}

	let coords = instruction.split(" through ");

	let startX = parseInt(coords[0].split(",")[0], 10);
	let endX = parseInt(coords[1].split(",")[0], 10);

	let startY = parseInt(coords[0].split(",")[1], 10);
	let endY = parseInt(coords[1].split(",")[1], 10);

	for (let x = startX; x <= endX; x++) {
		for (let y = startY; y <= endY; y++) {
			if (!lights[getStrPos(x, y)]) lights[getStrPos(x, y)] = 0;
			appliedFunction(x, y);
		}
	}

	console.log(index, "out of", instructions.length);
});

console.log(Object.keys(lights).map(k => lights[k]).reduce((a,b) => a+b, 0));
