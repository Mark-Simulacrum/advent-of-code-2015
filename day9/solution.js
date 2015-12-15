let fs = require("fs");
let without = require("lodash.without");

let data = fs.readFileSync("./data").toString();

let distances = {};

data.split("\n").forEach(line => {
	let fromCity = line.split(" to ")[0];
	let toCity = line.split(" to ")[1].split(" = ")[0];
	let distance = parseInt(line.split(" to ")[1].split(" = ")[1]);

	if (!distances[fromCity]) distances[fromCity] = {};
	if (!distances[toCity]) distances[toCity] = {};

	distances[fromCity][toCity] = distance;
	distances[toCity][fromCity] = distance;
});

function getDistance(cityA, cityB) {
	return distances[cityA][cityB];
}

const cities = Object.keys(distances);
const cityAmount = Object.keys(distances).length;

let cityPatterns = [];

function generatePossibilities(array) {
	if (array.length === 1) return array;

	let poss = [];

	for (let i = 0; i < array.length; i++) {
		let value = array[i];

		let otherValues = array.slice(0);
		otherValues.splice(i, 1);

		let possibilities = generatePossibilities(otherValues);

		for (let x = 0; x < possibilities.length; x++) {
			let possibility = possibilities[x];

			poss.push([value].concat(possibility));
		}
	}

	return poss;
}

let poss = generatePossibilities(cities);

poss = poss.map(possibility => {
	let distanceTraveled = 0;

	let cities = possibility.slice(0).join(" -> ");

	let lastCity = possibility.shift();

	while (possibility.length > 0) {
		let currentCity = possibility.shift();
		distanceTraveled += getDistance(lastCity, currentCity);
		lastCity = currentCity;
	}

	return { cities, distanceTraveled };
});

console.log(poss);
