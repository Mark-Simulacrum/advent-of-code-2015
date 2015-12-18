const _ = require("lodash");

function permutations(array) {
    if (array.length === 1) return array;

    let poss = [];

    for (let i = 0; i < array.length; i++) {
        let value = array[i];

        let otherValues = array.slice(0);
        otherValues.splice(i, 1);

        let possibilities = permutations(otherValues, false);

        possibilities.push(value);
        poss.push(possibilities);
    }

    console.log("returning from permute", array.length, poss.length);

    return poss;
}

// k = length of resulting combinations
function combinations(array, k) {
    let returnArr = [];

    if (k === 1) {
        return array.map(element => [element]);
    }

    while (array.length) {
        let value = array.shift();

        if (k > 0) {
            let sub = combinations(array.slice(0), k - 1);

            let insertedSelfSub = sub.map(next => [value, ...next]);

            returnArr.push(...insertedSelfSub);
        }
    }

    return returnArr;
}

function allCombinations(array) {
    return _.flatten(array.map((_, index) => {
        console.log("operating on k =", index);
        return combinations(array, index);
    }));
}

function sum(array) {
    return array.reduce((a, b) => a + b);
}

module.exports = {
    permutations,
    allCombinations,
    combinations,
    sum
};
