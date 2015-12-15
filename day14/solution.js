let fs = require("fs");
let _ = require("lodash");

let data = fs.readFileSync("./data").toString();

function parseDataLine(line) {
	let name = line.split(" ")[0];
	let kmPerSec = parseInt(/(\d+) km\/s/.exec(line)[1], 10);
	let speedTime = parseInt(/km\/s for (\d+) seconds/.exec(line)[1], 10);
	let restTime = parseInt(/rest for (\d+) seconds/.exec(line)[1], 10);

	console.log({ name, kmPerSec, speedTime, restTime });

	return { name, kmPerSec, speedTime, restTime };
}

function getDistanceAtTime(time, reindeerObject) {
	let kmPerSec = reindeerObject.kmPerSec;
	let speedTime = reindeerObject.speedTime;
	let restTime = reindeerObject.restTime;

	let distanceTraveled = 0;

	let timeSpeeding = 0;
	let timeResting = 0;
	let isResting = false;

	for (let i = 1; i <= time; i++) {
		if (timeSpeeding === speedTime) {
			isResting = true;
			timeSpeeding = 0;
		} else if (timeResting === restTime) {
			isResting = false;
			timeResting = 0;
		}

		if (!isResting) {
			distanceTraveled += kmPerSec;
			timeSpeeding++;
		} else {
			timeResting++;
		}
	}

	return distanceTraveled;
}

let seconds = 2503;
let reindeers = data.split("\n")
	.map(line => parseDataLine(line));

function getDistanceObject(reindeerObject, seconds) {
	return { name: reindeerObject.name, distance: getDistanceAtTime(seconds, reindeerObject) };
}

function inLeadAtSecond(reindeers, second) {
	let distanceObjects = reindeers
		.map(reindeerObject => getDistanceObject(reindeerObject, second));

	distanceObjects = distanceObjects.sort((a, b) => {
		return a.distance - b.distance;
	}).reverse();

	if (distanceObjects[0].distance === distanceObjects[1].distance) {
		return [distanceObjects[0].name, distanceObjects[1].name];
	}

	return [distanceObjects[0].name];
}

let reindeerNames = {};

reindeers.forEach(reindeer => {
	reindeerNames[reindeer.name] = 0;
});

for (let i = 1; i <= seconds + 1; i++) {
	let inLeads = inLeadAtSecond(reindeers, i);

	for (let inLead of inLeads)
		reindeerNames[inLead]++;
}

console.log(reindeerNames);
