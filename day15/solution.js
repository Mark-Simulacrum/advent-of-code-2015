let _ = require("lodash");
let util = require("../util");

let input = require("fs").readFileSync("./data").toString();


let ingredients = {};

for (let line of input.split("\n")) {
	let name = line.split(": ")[0];

	let ingredientObject = { };
	let properties = line.split(": ")[1].split(", ");

	for (let property of properties) {
		let propertyName = property.split(" ")[0];
		let value = parseInt(property.split(" ")[1], 10);

		ingredientObject[propertyName] = value;
	}

	ingredients[name] = ingredientObject;
}

function getPropertyScore(property, cookieIngredients) {
	return util.sum(
		cookieIngredients.map(ingredient =>
			ingredient[property] * ingredient.value));
}

// cookie = [{ name, properties, amount }...]
function calculateScore(cookieIngredients) {
	let properties = ["capacity", "durability", "flavor", "texture"];

	let propertyScores = {};
	properties.forEach(property => (propertyScores[property] = getPropertyScore(property, cookieIngredients)));

	propertyScores = _.mapValues(propertyScores, currentValue => {
		return currentValue < 0 ? 0 : currentValue;
	});

	let score = _(propertyScores).values().reduce((a, b) => a * b);

	let calories = getPropertyScore("calories", cookieIngredients);

	return {score, calories};
}

function addValue(ingredient, value) {
	return Object.assign(ingredient, { value });
}

let maxScore = 0;
let keys = Object.keys(ingredients);

let optionsTried = 0;
for (let i of _.range(0, 100)) {
	for (let j of _.range(0, 100 - i)) {
		for (let k of _.range(0, 100 - i - j)) {
			let h = 100 - i - j - k;

			let scoreInput = [
				addValue(ingredients[keys[0]], i),
				addValue(ingredients[keys[1]], j),
				addValue(ingredients[keys[2]], k),
				addValue(ingredients[keys[3]], h)
			];

			let SC = calculateScore(scoreInput);

			let score = SC.score;
			let calories = SC.calories;

			if (calories === 500) maxScore = Math.max(maxScore, score);

			optionsTried++;
		}
	}
}

console.log(maxScore, optionsTried);
