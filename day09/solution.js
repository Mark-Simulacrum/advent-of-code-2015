let fs = require("fs");
let _ = require("lodash");
let util = require("../util");

let data = fs.readFileSync("./data").toString();

let distances = {};

data.split("\n").forEach(line => {
	let parts = line.split(" to ");

	let fromCity = parts[0];
	let toCity = parts[1].split(" = ")[0];
	let distance = parseInt(parts[1].split(" = ")[1]);

	if (!distances[fromCity]) distances[fromCity] = {};
	if (!distances[toCity]) distances[toCity] = {};

	distances[fromCity][toCity] = distance;
	distances[toCity][fromCity] = distance;
});

function getDistance(cityA, cityB) {
	return distances[cityA][cityB];
}

const cities = Object.keys(distances);

let travelDistances = util.permutations(cities).map(possibility => {
	let distanceTraveled = 0;

	let lastCity = possibility.shift();

	while (possibility.length > 0) {
		let currentCity = possibility.shift();
		distanceTraveled += getDistance(lastCity, currentCity);
		lastCity = currentCity;
	}

	return distanceTraveled;
});

let sortedDistances = travelDistances.sort((a, b) => a - b);

console.log("Part 1:", sortedDistances[0]);
console.log("Part 2:", sortedDistances[sortedDistances.length - 1]);
