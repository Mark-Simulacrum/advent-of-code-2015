// hlf r = half current value in register
// tpl r = triple current value
// inc r = r++
// jmp offset = jump offset instructions (relative to self)
// jie r, offset = jump offset if r is even
// jio r, offset = jump offset if r is 1
//
// offset is written +1 or -1 (jump one forward or jump one backward)
// stop execution if unkown instruction encountered

let instructions = require("fs").readFileSync("./data").toString().split("\n");

function parseInstruction(line) {
	if (line.startsWith("inc")) {
		return { type: "increment", register: line.match(/inc (.)/)[1] };
	} else if (line.startsWith("jio")) {
		return { type: "jumpifone", register: line.match(/jio (.)/)[1], offset: parseInt(line.match(/[+-]\d+/)[0], 10) };
	} else if (line.startsWith("tpl")) {
		return { type: "triple", register: line.match(/tpl (.)/)[1] };
	} else if (line.startsWith("jmp")) {
		return { type: "jump", offset: parseInt(line.match(/[+-]\d+/)[0], 10) };
	} else if (line.startsWith("jie")) {
		return { type: "jumpifeven", register: line.match(/jie (.)/)[1], offset: parseInt(line.match(/[+-]\d+/)[0], 10) };
	} else if (line.startsWith("hlf")) {
		return { type: "half", register: line.match(/hlf (.)/)[1] };
	}

	throw new Error("unparseable line: " + line);
}

instructions = instructions.map(parseInstruction);

let registers = { a: 1, b: 0 };

for (let i = 0; i < instructions.length;) {
	let instruction = instructions[i];
	if (instruction.type === "increment") {
		registers[instruction.register]++;

		i++;
	} else if (instruction.type === "half") {
		registers[instruction.register] /= 2;

		i++;
	} else if (instruction.type === "triple") {
		registers[instruction.register] *= 3;

		i++;
	} else if (instruction.type === "jumpifone") {
		if (registers[instruction.register] === 1) {
			i += instruction.offset;
		} else {
			i++;
		}
	} else if (instruction.type === "jump") {
		i += instruction.offset;
	} else if (instruction.type === "jumpifeven") {
		if (registers[instruction.register] % 2 === 0) {
			i += instruction.offset;
		} else {
			i++;
		}
	} else {
		break;
	}
}

console.log(registers);
