let row = 2978;
let column = 3083;
let iterations = (row + column - 2) * (row + column - 1) / 2 + column;

let currentCode = 20151125;
for (let i = 1; i < iterations; i++) {
	currentCode = currentCode * 252533;
	currentCode = currentCode % 33554393;
}

console.log("Part 1:", currentCode);
