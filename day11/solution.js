let input = "hxbxwxba";

let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function getNextChar(char) {
	return alphabet.indexOf(char) < alphabet.length ? alphabet[alphabet.indexOf(char) + 1] : "a"; // Get next letter in alphabet or the letter "a"
}

function doesWrap(char) {
	return alphabet.indexOf(char) === alphabet.indexOf("z");
}

function incrementPassword(input) {
	let inputChars = input.split("");

	let wrappedLetters = 0;

	while (inputChars.length) {
		let lastChar = inputChars.pop();

		if (doesWrap(lastChar)) {
			wrappedLetters++;
		} else {
			if (wrappedLetters > 0) {
				let wrappedLetterString = Array(wrappedLetters).fill("a").join("");
				return inputChars.join("") + getNextChar(lastChar) + wrappedLetterString;
			} else {
				return inputChars.join("") + getNextChar(lastChar);
			}
		}
	}

	throw new Error("no more passwords");
}

function isConsecutive(array) {
	let isConsecutive = false;

	for (let i = 1; i < array.length; i++) {
		if (array[i] - 1 === array[i - 1]) {
			isConsecutive = true;
		} else {
			return false;
		}
	}

	return isConsecutive;
}

function isCorrectPassword(password) {
	if (password.indexOf("i") >= 0 || password.indexOf("o") >= 0 || password.indexOf("l") >= 0) {
		return false;
	}

	let chars = password.split("");

	let didBreak = false;
	for (let i = 0; i + 2 !== chars.length; i++) {
		let threeCharGroup = chars.slice(i, i + 3);

		let indexesInAlphabet = threeCharGroup.map(char => alphabet.indexOf(char));

		if (isConsecutive(indexesInAlphabet)) {
			didBreak = true;
			break; // We passed this test, so we can exit it.
		}
	}

	if (!didBreak) return false;

	let pairSeen;
	for (let i = 0; i < chars.length; i++) {
		if (chars[i] === chars[i + 1]) {
			let str = chars[i] + chars[i + 1];

			if (pairSeen && str !== pairSeen) {
				return true;
			} else {
				pairSeen = str;
			}
		}
	}

	return false;
}

let currentPassword = "hxbxwxba";
let i = 0;
let startedAt = Date.now();
while (!isCorrectPassword(currentPassword)) {
	i++;
	currentPassword = incrementPassword(currentPassword);
}

currentPassword = incrementPassword(currentPassword);

while (!isCorrectPassword(currentPassword)) {
	i++;
	currentPassword = incrementPassword(currentPassword);
}

console.log(currentPassword, isCorrectPassword(currentPassword));
