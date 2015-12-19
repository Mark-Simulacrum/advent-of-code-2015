let input = require("fs").readFileSync("./data").toString();

let santaPosition = [0, 0];
let roboSantaPosition = [0, 0];

let uniqueSantaPositions = [];

function updateUniquePositions() {
	let santaPositionStr = santaPosition.toString();
	let roboSantaPositionStr = roboSantaPosition.toString();

	if (uniqueSantaPositions.indexOf(santaPositionStr) === -1) {
		uniqueSantaPositions.push(santaPositionStr);
	}

	if (uniqueSantaPositions.indexOf(roboSantaPositionStr) === -1) {
		uniqueSantaPositions.push(roboSantaPositionStr);
	}
}

updateUniquePositions();
input.split("").forEach((char, index) => {
	let currentSantaPos = index % 2 === 0 ? santaPosition : roboSantaPosition; // Part 2

	if (char === "^") {
		currentSantaPos[1]++;
	} else if (char === "v") {
		currentSantaPos[1]--;
	} else if (char === ">") {
		currentSantaPos[0]++;
	} else if (char === "<") {
		currentSantaPos[0]--;
	}

	updateUniquePositions();
});

console.log("Houses with at least one present:", uniqueSantaPositions.length);
