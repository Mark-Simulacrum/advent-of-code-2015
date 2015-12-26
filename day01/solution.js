let data = require("fs").readFileSync("./data").toString();

let chars = data.split("");

let floorsUp = chars.filter(char => char === "(").length;
let floorsDown = chars.length - floorsUp;

console.log("Part 1:", floorsUp - floorsDown);

// Part 2

let floor = 0;
while (floor >= 0) chars.shift() === "(" ? floor++ : floor--;

console.log("Part 2:", data.length - chars.length);
