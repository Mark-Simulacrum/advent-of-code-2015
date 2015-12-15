let data = "1113222113";

function sameHead(input) {
	if (!input.length) return "";

	let accumulate = input.charAt(0);
	for (let i = 1; i < input.length; i++) { // Skip first letter b/c already in accumulate
		if (accumulate.charAt(0) === input.charAt(i)) {
			accumulate += input.charAt(i);
		} else {
			break;
		}
	}

	return accumulate;
}

function applyOperation(input) {
	let result = "";
	while (input.length) {
		let head = sameHead(input);
		input = input.slice(head.length);

		result += `${head.length}${head.charAt(0)}`;
	}

	return result;
}

let currentData = data;
for (let i = 0; i < 50; i++) {
	currentData = applyOperation(currentData);

	// console.log(`${i} / 40; ${currentData.length}`);
}

process.stdout.write(currentData);

