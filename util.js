function permutations(array) {
        if (array.length === 1) return array;

        let poss = [];

        for (let i = 0; i < array.length; i++) {
                let value = array[i];

                let otherValues = array.slice(0);
                otherValues.splice(i, 1);

                let possibilities = permutations(otherValues);

                for (let x = 0; x < possibilities.length; x++) {
                        let possibility = possibilities[x];

                        poss.push([value].concat(possibility));
                }
        }

        return poss;
}

function sum(array) {
        return array.reduce((a, b) => a + b);
}

module.exports = {
        permutations,
        sum
};
