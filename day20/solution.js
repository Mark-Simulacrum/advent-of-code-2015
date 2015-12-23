const requiredPresents = 34000000;

function firstHouse(presentsPerHouse, stopAt50) {
	const endCond = requiredPresents / presentsPerHouse;

	let houses = Array(Math.floor(endCond)).fill(10);

	for (let elfNum = 2; elfNum < endCond; elfNum++) {
		let housesVisited = 0;

		for (let houseNum = elfNum; houseNum < endCond; houseNum += elfNum) {
			houses[houseNum] += elfNum * presentsPerHouse;

			if (stopAt50) {
				housesVisited++;
				if (housesVisited === 50) break;
			}
		}

		if (houses[elfNum] >= requiredPresents) return elfNum;
	}
}

console.log("First house, part 1:", firstHouse(10, false));
console.log("First house, part 2:", firstHouse(11, true));
