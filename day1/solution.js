let data = require("fs").readFileSync("./data").toString();

let floorsUp = data.split("").filter(char => char === "(").length;
let floorsDown = data.split("").filter(char => char === ")").length;

console.log("Ended up on:", floorsUp - floorsDown);

// Part 2

let floor = 0;
let chars = data.split("");
while (floor >= 0) chars.shift() === "(" ? floor++ : floor--;

console.log("Went basement:", data.length - chars.length);
