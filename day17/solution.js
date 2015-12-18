const _ = require("lodash");
const util = require("../util");

const input = require("fs").readFileSync("./data").toString();

const containers = input.split("\n")
	.map(container => parseInt(container, 10)).sort((a, b) => a - b);

let sumTo150 = util.combinations(containers, 4)
	.filter(containers => util.sum(containers) === 150);

console.log(sumTo150.length);
