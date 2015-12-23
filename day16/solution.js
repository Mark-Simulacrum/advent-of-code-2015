let input = require("fs").readFileSync("./data").toString();

let hint = parseLine("sue 0: children: 3, cats: 7, samoyeds: 2, pomeranians: 3, akitas: 0, vizslas: 0, goldfish: 5, trees: 3, cars: 2, perfumes: 1");

let aunts = [];

for (let aunt of input.split("\n")) {
	aunts.push(parseLine(aunt));
}

function parseLine(line) {
	let data = line.match(/^Sue \d+: (.*?)$/i)[1];
	let colonTraits = data.split(", ");
	let traits = {};

	colonTraits.map(trait => trait.split(": ")).forEach(pair => traits[pair[0]] = pair[1]);

	return traits;
}

function traitMatch(traitName, reading, trait) {
	if (traitName === "cats" || traitName === "trees") {
		return parseInt(reading, 10) < parseInt(trait, 10);
	} else if (traitName === "pomeranians" || traitName === "goldfish") {
		return parseInt(reading, 10) > parseInt(trait, 10);
	} else {
		return reading === trait;
	}
}

let successfulAunts = [];

aunts.forEach((aunt, index) => {
	const auntTraits = Object.keys(aunt);
	const hintTraits = Object.keys(hint);

	const unionTraits = auntTraits.filter(trait => hintTraits.indexOf(trait) >= 0);

	if (unionTraits.length > 0) {
		const isSuccessful = unionTraits.every(trait => traitMatch(trait, hint[trait], aunt[trait]));

		if (isSuccessful) successfulAunts.push({ aunt, index });
	}
});

console.log(successfulAunts);
