// row 2978, column 3083

function getNumber(row, column) {
	let currentRow = 1;
	let currentCol = 1;
	let iterations = 1;

	let maxRow = 1;
	let maxCol = 1;

	while (!(currentRow === row && currentCol === column)) {
		if (currentRow === 1) {
			maxCol = currentCol;
			currentCol = 1;

			maxRow = maxRow + 1;
			currentRow = maxRow;
		} else {
			currentRow--;
			currentCol++;
		}

		iterations++;
	}

	return iterations;
}

let iterations = getNumber(2978, 3083);
let currentCode = 20151125;
for (let i = 1; i < iterations; i++) {
	currentCode = currentCode * 252533;
	currentCode = currentCode % 33554393;
}

console.log(currentCode);

