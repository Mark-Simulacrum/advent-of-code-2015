const _ = require("lodash");

let input = require("fs").readFileSync("./data").toString();

function part1() {
	let possibleReplacements = {};
	input.split("\n").forEach(replacement => {
		let parts = replacement.split(" => ");
		let from = parts[0];
		let to = parts[1];

		if (possibleReplacements[from] !== undefined) {
			if (possibleReplacements[from].indexOf(to) === -1) {
				possibleReplacements[from].push(to);
			}
		} else {
			possibleReplacements[from] = [to];
		}
	});

	let inputMolecule = "CRnSiRnCaPTiMgYCaPTiRnFArSiThFArCaSiThSiThPBCaCaSiRnSiRnTiTiMgArPBCaPMgYPTiRnFArFArCaSiRnBPMgArPRnCaPTiRnFArCaSiThCaCaFArPBCaCaPTiTiRnFArCaSiRnSiAlYSiThRnFArArCaSiRnBFArCaCaSiRnSiThCaCaCaFYCaPTiBCaSiThCaSiThPMgArSiRnCaPBFYCaCaFArCaCaCaCaSiThCaSiRnPRnFArPBSiThPRnFArSiRnMgArCaFYFArCaSiRnSiAlArTiTiTiTiTiTiTiRnPMgArPTiTiTiBSiRnSiAlArTiTiRnPMgArCaFYBPBPTiRnSiRnMgArSiThCaFArCaSiThFArPRnFArCaSiRnTiBSiThSiRnSiAlYCaFArPRnFArSiThCaFArCaCaSiThCaCaCaSiRnPRnCaFArFYPMgArCaPBCaPBSiRnFYPBCaFArCaSiAl";

	let synthesizeable = [];

	for (let i = 0; i < inputMolecule.length; i++) {
		let inputAtom = inputMolecule.charAt(i);

		if (possibleReplacements[inputAtom + inputMolecule.charAt(i + 1)] !== undefined) {
			synthesizeable.push([inputAtom + inputMolecule.charAt(i + 1), ...possibleReplacements[inputAtom + inputMolecule.charAt(i + 1)]]);
			i++;
		} else if (possibleReplacements[inputAtom]) {
			synthesizeable.push([inputAtom, ...possibleReplacements[inputAtom]]);
		} else {
			synthesizeable.push([inputAtom]);
		}
	}

	function getCombinations(array) {
		let combinations = [];

		for (let i = 0; i < array.length; i++) {
			let current = array[i];
			let before = array.slice(0, i).map(element => element[0]);
			let rest = array.slice(i + 1).map(element => element[0]);

			for (let x = 1; x < current.length; x++) { // skip first element because it's the input
				let otherValue = current[x];

				let building = [];
				building.push(...before);
				building.push(otherValue);
				building.push(...rest);
				combinations.push(building);
			}

		}

		return combinations;
	}

	console.log("Part 1:", _.uniq(getCombinations(synthesizeable).map(a => a.join(""))).length);
}

function part2() {
	let possibleReplacements = {};
	input.split("\n").forEach(replacement => {
		let parts = replacement.split(" => ");
		let from = parts[1];
		let to = parts[0];

		possibleReplacements[from] = to;
	});

	let mol = "CRnSiRnCaPTiMgYCaPTiRnFArSiThFArCaSiThSiThPBCaCaSiRnSiRnTiTiMgArPBCaPMgYPTiRnFArFArCaSiRnBPMgArPRnCaPTiRnFArCaSiThCaCaFArPBCaCaPTiTiRnFArCaSiRnSiAlYSiThRnFArArCaSiRnBFArCaCaSiRnSiThCaCaCaFYCaPTiBCaSiThCaSiThPMgArSiRnCaPBFYCaCaFArCaCaCaCaSiThCaSiRnPRnFArPBSiThPRnFArSiRnMgArCaFYFArCaSiRnSiAlArTiTiTiTiTiTiTiRnPMgArPTiTiTiBSiRnSiAlArTiTiRnPMgArCaFYBPBPTiRnSiRnMgArSiThCaFArCaSiThFArPRnFArCaSiRnTiBSiThSiRnSiAlYCaFArPRnFArSiThCaFArCaCaSiThCaCaCaSiRnPRnCaFArFYPMgArCaPBCaPBSiRnFYPBCaFArCaSiAl";

	let target = mol;
	let part2 = 0;
	let iter = 0;

	let possibleReplacementKeys = Object.keys(possibleReplacements);
	while (target !== "e") {
		let tmp = target;

		for (let b of possibleReplacementKeys) {
			if (target.indexOf(b) === -1) continue;

			target = target.replace(b, possibleReplacements[b]);
			part2++;
		}

		if (tmp === target) {
			part2 = 0;
			possibleReplacementKeys = _.shuffle(possibleReplacementKeys);
		}
	}

	console.log("Part 2:", part2);
}

part1();
part2();
