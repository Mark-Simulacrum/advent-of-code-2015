let input = require("fs").readFileSync("./data").toString();

let lights = [];

let lightRows = input.split("\n");
for (let y = 0; y < lightRows.length; y++) {
	let row = lightRows[y];
	if (!lights[y]) lights[y] = [];

	for (let x = 0; x < row.length; x++) {
		let light = row.charAt(x);

		lights[y][x] = light === "#" ? true : false;
	}
}

function getNeighbors(currentState, row, column) {
	let neighbors = [];

	for (let rowShift = -1; rowShift <= 1; rowShift++) {
		let rowIndex = row + rowShift;

		for (let columnShift = -1; columnShift <= 1; columnShift++) {
			if (rowShift === 0 && columnShift === 0) continue; // Skip self

			let columnIndex = column + columnShift;

			if (currentState[rowIndex] !== undefined &&
				currentState[rowIndex][columnIndex] !== undefined) {

				neighbors.push(currentState[rowIndex][columnIndex]);
			}
		}
	}

	return neighbors;
}

const width = lights[0].length - 1;
const height = lights.length - 1;
let part2 = false;

function nextStateLight(currentState, row, column) {
	if (part2) {
		if (row === 0 && column === 0) return true;
		if (row === 0 && column === width) return true;

		if (row === height && column === 0) return true;
		if (row === height && column === width) return true;
	}

	let neighbors = getNeighbors(currentState, row, column);

	let amountNeighborsOn = neighbors.filter(neighbor => !!neighbor).length;

	if (currentState[row][column]) {
		return amountNeighborsOn === 2 || amountNeighborsOn === 3;
	} else {
		return amountNeighborsOn === 3;
	}
}

function nextState(currentState) {
	return currentState.map((row, rowN) => {
		return row.map((_, columnN) => nextStateLight(currentState, rowN, columnN));
	});
}

function printState(state) {
	return state.map(row => {
		return row.map(light => light ? "#" : ".").join("");
	}).join("\n");
}

function amountOn(state) {
	let lightsOn = 0;

	state.forEach(row => {
		row.forEach(light => {
			if (light) lightsOn++;
		});
	});

	return lightsOn;
}

let l = lights.slice(0);
let currentState = lights;
for (let i = 0; i < 100; i++) {
	currentState = nextState(currentState);
}

console.log("Part 1:", amountOn(currentState));

lights[0][0] = true;
lights[0][width] = true;
lights[height][0] = true;
lights[height][width] = true;
part2 = true;

currentState = l;
for (let i = 0; i < 100; i++) {
	currentState = nextState(currentState);
}

console.log("Part 2:", amountOn(currentState));
