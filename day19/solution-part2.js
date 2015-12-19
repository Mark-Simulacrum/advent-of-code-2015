const _ = require("lodash");
const util = require("../util");

let input = require("fs").readFileSync("./data").toString();

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

console.log(part2);
