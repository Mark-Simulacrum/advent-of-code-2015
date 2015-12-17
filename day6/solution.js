let fs = require("fs");
let _ = require("lodash");

let data = fs.readFileSync("./data").toString();

let lights = [];

for (let x = 0; x <= 999; x++) {
	let row = [];
	for (let y = 0; y <= 999; y++) {
		row.push(0);
	}
	lights.push(row);
}

function toggle(x, y) {
	lights[x][y] += 2;
}

function turnOn(x, y) {
	lights[x][y]++;
}

function turnOff(x, y) {
	if (lights[x][y] > 0) lights[x][y]--;
}

let instructions = data.split("\n");

instructions.forEach(instruction => {
	let appliedFunction;

	let regexExec = /(\d+),(\d+) through (\d+),(\d+)/.exec(instruction);

	let startX = parseInt(regexExec[1], 10);
	let startY = parseInt(regexExec[2], 10);

	let endX = parseInt(regexExec[3], 10);
	let endY = parseInt(regexExec[4], 10);

	if (instruction.indexOf("turn on") === 0) {
		appliedFunction = turnOn;
	} else if (instruction.indexOf("turn off") === 0) {
		appliedFunction = turnOff;
	} else if (instruction.indexOf("toggle") === 0) {
		appliedFunction = toggle;
	}

	for (let x = startX; x <= endX; x++) {
		for (let y = startY; y <= endY; y++) {
			appliedFunction(x, y);
		}
	}
});

const out = _(lights).flatten().reduce((a, b) => a + b, 0);
console.log(out, 17836115 - out);
