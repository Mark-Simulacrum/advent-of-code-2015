let input = require("fs").readFileSync("./data").toString();

let santaPosition = [0, 0];
let roboSantaPosition = [0, 0];

let uniqueSantaPositions = [];

function updateUniquePositions() {
	if (uniqueSantaPositions.indexOf(santaPosition.toString()) === -1) {
		uniqueSantaPositions.push(santaPosition.toString());
	}

	if (uniqueSantaPositions.indexOf(roboSantaPosition.toString()) === -1) {
		uniqueSantaPositions.push(roboSantaPosition.toString());
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
