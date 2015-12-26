let data = "1113222113";

function sameHead(input, startAt) {
	let firstChar = input.charAt(startAt);
	let howMany = 1;
	for (let i = startAt + 1; i < input.length; i++) { // Skip first letter b/c already in accumulate
		if (firstChar === input.charAt(i)) {
			howMany++;
		} else {
			break;
		}
	}

	return howMany;
}

function applyOperation(input) {
	let result = "";
	let summativeHeadLength = 0;
	while (summativeHeadLength < input.length) {
		const howMany = sameHead(input, summativeHeadLength);

		result += howMany + input.charAt(summativeHeadLength);
		summativeHeadLength += howMany;
	}

	return result;
}

let currentData = data;
for (let i = 1; i <= 50; i++) {
	currentData = applyOperation(currentData);

	if (i == 40) console.log("Part 1:", currentData.length);
	if (i == 50) console.log("Part 2:", currentData.length);
}
