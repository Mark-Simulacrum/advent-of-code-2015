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
function _combinations(array, k) {
    let returnArr = [];

    if (k === 1) {
        return array.map(element => [element]);
    }

    while (array.length) {
        let value = array.shift();

        let sub = combinations(array.slice(0), k - 1);

        for (let i = 0; i < sub.length; i++) {
            let cur = sub[i];
            returnArr.push([value].concat(sub[i]));
        }
    }

    return returnArr;
}

const combinations = _.memoize(_combinations, (a, b) => a.join("") + b);

function allCombinations(array) {
    let combs = [];

    for (let i = 1; i <= array.length; i++) {
        combs = combs.concat(combinations(array.slice(0), i));
    }

    return combs;
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
