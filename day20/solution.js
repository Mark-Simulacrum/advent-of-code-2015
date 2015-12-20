const requiredPresents = 34000000;
const endCond = requiredPresents / 10;

let houses = [];
for (let houseNum = 0; houseNum < endCond; houseNum++) {
	houses[houseNum] = 0;
}

for (let elfNum = 1; elfNum < endCond; elfNum++) {
	for (let housesVisited = 0, houseNum = elfNum; houseNum < endCond && housesVisited < 50; houseNum += elfNum, housesVisited++) {
		houses[houseNum] += elfNum * 11;
	}
}

for (let houseNum = 0; houseNum < houses.length; houseNum++) {
	if (houses[houseNum] >= requiredPresents) {
		console.log("Minimum house number with enough presents:", houseNum);
		break;
	}
}
