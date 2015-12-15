let fs = require("fs");
let _ = require("lodash");
let util = require("../util");

let input = fs.readFileSync("./data").toString();

function getPersonFromLine(line) {
	return line.split(" ")[0];
}

let people = {};

for (let line of input.split("\n")) {
	let withWhom = /to (\w+)\./.exec(line)[1];
	let gainOrLose = /gain|lose/.exec(line)[0];
	let amount = /\d+/.exec(line)[0];

	let person = getPersonFromLine(line);

	if (!people[person]) people[person] = {};
	if (!people["Me"]) people["Me"] = {};

	people[person][withWhom] = (gainOrLose === "lose" ? -1 : 1) * amount;

	people[person]["Me"] = 0;
	people["Me"][person] = 0;
}

console.log(people);

let permutations = util.permutations(Object.keys(people));

function sittingNextTo(name, array) {
	let index = array.indexOf(name);

	if (index === 0) {
		return {
			left: array[array.length - 1],
			right: array[index + 1]
		};
	} else if (index === array.length - 1) {
		return {
			left: array[index - 1],
			right: array[0]
		};
	} else {
		return {
			left: array[index - 1],
			right: array[index + 1]
		};
	}
}

function calculateHappiness(array) {
	let happiness = 0;

	for (let i = 0; i < array.length; i++) {
		let name = array[i];
		let seatedBeside = sittingNextTo(name, array);

		happiness += people[name][seatedBeside.left];
		happiness += people[name][seatedBeside.right];
	}

	return happiness;
}

let bestOptionSoFar = { happiness: -Infinity, order: null };
for (let permutation of permutations) {
	let happiness = calculateHappiness(permutation);

	if (happiness > bestOptionSoFar.happiness) {
		bestOptionSoFar = { happiness, order: permutation };
	}
}

console.log(bestOptionSoFar);
