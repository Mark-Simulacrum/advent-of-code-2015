const _ = require("lodash");
const util = require("../util");

const input = require("fs").readFileSync("./data").toString();

const containers = input.split("\n")
	.map(container => parseInt(container, 10));

let part1 = util.allCombinations(containers)
	.filter(containers => util.sum(containers) === 150);

console.log("Combinations (Part 1):", part1.length);

let lowestQuantity = Math.min(...part1.map(containerList => containerList.length));
let part2 = util.combinations(containers, lowestQuantity)
	.filter(containers => util.sum(containers) === 150);

console.log("Combinations with minimum space (Part 2):", part2.length);
