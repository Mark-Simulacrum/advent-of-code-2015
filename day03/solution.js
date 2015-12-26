let input = require("fs").readFileSync("./data").toString();

function iterate(isPart2) {
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
		let currentSantaPos = santaPosition;
		if (isPart2) currentSantaPos = index % 2 === 0 ? santaPosition : roboSantaPosition;

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

	return uniqueSantaPositions.length;
}

console.log("Part 1:", iterate(false));
console.log("Part 2:", iterate(true));
