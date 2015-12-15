let _ = require("lodash");
let fs = require("fs");

let input = fs.readFileSync("./data").toString();

function parseInputLine(input) {
	let sides = input.split(" -> ");
	let lhs = sides[0];
	let rhs = sides[1];

	let outputWire = rhs;

	let operation = parseOperation(lhs);

	if (operation.lhs && /^\d+$/.test(operation.lhs)) operation.lhs = parseInt(operation.lhs, 10);
	if (operation.rhs && /^\d+$/.test(operation.rhs)) operation.rhs = parseInt(operation.rhs, 10);
	if (operation.value && /^\d+$/.test(operation.value)) operation.value = parseInt(operation.value, 10);

	operation.depends = dependsOn(operation);

	return { operation, output: outputWire };
}

const Operators = {
	Assignment: null,
	AND: null,
	OR: null,
	LSHIFT: null,
	RSHIFT: null,
	NOT: null
};

const OperatorFunctions = {
	Assignment: input => input,
	AND: (lhs, rhs) => lhs & rhs,
	OR: (lhs, rhs) => lhs | rhs,
	LSHIFT: (lhs, rhs) => lhs << rhs,
	RSHIFT: (lhs, rhs) => lhs >> rhs,
	NOT: input => ~input & 0xffff
};

Object.keys(Operators).forEach(key => Operators[key] = key);

function parseOperation(text) {
	let binaryOperators = ["AND", "OR", "LSHIFT", "RSHIFT"];

	if (/^(\d|\w)+$/.test(text)) {
		return { operator: Operators.Assignment, value: text };
	} else if (text.indexOf("NOT") === 0) {
		return { operator: Operators.NOT, value: text.split("NOT ")[1] };
	} else {
		for (let binaryOperator of binaryOperators) {
			let spaceBinaryOperator = ` ${binaryOperator} `;

			if (text.indexOf(spaceBinaryOperator) !== -1) {
				return { operator: Operators[binaryOperator], lhs: text.split(spaceBinaryOperator)[0], rhs: text.split(spaceBinaryOperator)[1] };
			}
		}
	}
}

function isNumber(text) {
	return /^\d+$/.test(text);
}

function dependsOn(operation) {
	let depends = [];
	if (operation.lhs && !isNumber(operation.lhs)) depends.push(operation.lhs);
	if (operation.rhs && !isNumber(operation.rhs)) depends.push(operation.rhs);
	if (operation.value && !isNumber(operation.value)) depends.push(operation.value);

	return depends;
}

let wires = {};

for (let line of input.split("\n")) {
	let lineObject = parseInputLine(line);

	console.log(lineObject.operation, "==>", lineObject.output);

	wires[lineObject.output] = lineObject.operation;
}

function areDependentsConstant(depends) {
	return depends.length === 0 || depends.every(dependent => isNumber(wires[dependent]));
}

function get(wireName, field) {
	return wires[wires[wireName][field]] === undefined ? wires[wireName][field] : wires[wires[wireName][field]];
}

function evaluateWires(wires) {
	let wireNames = Object.keys(wires);

	for (let wireName of wireNames) {
		if (!wires[wireName]) console.log(wireName, wires[wireName])
		if (!isNumber(wires[wireName])) {
			if (areDependentsConstant(wires[wireName].depends)) {
				let func = OperatorFunctions[wires[wireName].operator];
				let argAmount = func.length;
				wires[wireName] = argAmount === 2 ?
					func(get(wireName, "lhs"), get(wireName, "rhs")) :
					func(get(wireName, "value"));
			}
		}
	}
}

wires.b = 16076;

while (_.values(wires).filter(value => isNumber(value)).length !== Object.keys(wires).length) evaluateWires(wires);
console.log(wires);
