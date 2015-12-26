let fs = require("fs");

let data = fs.readFileSync("./data").toString();

let escape = /\\(?:"|\\)/g;
let char = /\\x[0-9a-f]{2}/g;

let quotes = 2 * data.split("\n").length;
let escapedChars = data.match(escape).length;
let hexadecimalChars = data.replace(escape, "X").match(char).length;

console.log("Part 1:", quotes + escapedChars + 3 * hexadecimalChars);
console.log("Part 2:", 2 * quotes + 2 * escapedChars + hexadecimalChars);
