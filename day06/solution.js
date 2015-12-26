let fs = require("fs");
let _ = require("lodash");

let data = fs.readFileSync("./data").toString();

function createLights() {
	let lights = [];
	for (let x = 0; x <= 999; x++) {
		let row = [];
		for (let y = 0; y <= 999; y++) {
			row.push(0);
		}
		lights.push(row);
	}
	return lights;
}


function lightLevel(isPart2) {
	let instructions = data.split("\n");

	let lights = createLights();
	const turnOn = isPart2 ?
		(x, y) => lights[x][y]++ :
		(x, y) => lights[x][y] = true;

	const turnOff = isPart2 ?
		(x, y) => { if (lights[x][y] > 0) lights[x][y]--; } :
		(x, y) => lights[x][y] = false;

	const toggle = isPart2 ?
		(x, y) => lights[x][y] += 2 :
		(x, y) => lights[x][y] = !lights[x][y];

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

	return isPart2 ?
		_.flatten(lights).reduce((a, b) => a + b) :
		_.flatten(lights).filter(a => a).length;
}

console.log("Part 1:", lightLevel(false));
console.log("Part 2:", lightLevel(true));
