import copy
import re

input = open("data", "r").read()

def parseInputLine(line):
	lhs, rhs = line.split(" -> ")

	outputWire = rhs

	operation = parseOperation(lhs)

	if 'lhs' in operation and isNumber(operation['lhs']):
		operation['lhs'] = int(operation['lhs'])

	if 'rhs' in operation and isNumber(operation['rhs']):
		operation['rhs'] = int(operation['rhs'])

	if 'value' in operation and isNumber(operation['value']):
		operation['value'] = int(operation['value'])

	operation['depends'] = dependsOn(operation)

	return {
		'operation': operation,
		'output': outputWire
	}

OperatorFunctions = {
	'Assignment': lambda input: input,
	'AND': lambda lhs, rhs: lhs & rhs,
	'OR': lambda lhs, rhs: lhs | rhs,
	'LSHIFT': lambda lhs, rhs: lhs << rhs,
	'RSHIFT': lambda lhs, rhs: lhs >> rhs,
	'NOT': lambda input: ~input
}
BinaryOperators = ("AND", "OR", "LSHIFT", "RSHIFT")

def parseOperation(text):
	if isNumber(text) or isWord(text):
		return {
			'operator': 'Assignment',
			'value': text
		}
	elif text.startswith("NOT"):
		return {
			'operator': 'NOT',
			'value': text.split("NOT ")[1]
		}
	else:
		for binaryOperator in BinaryOperators:
			spaceBinaryOperator = ' ' + binaryOperator + ' ';

			if spaceBinaryOperator in text:
				return {
					'operator': binaryOperator,
					'lhs': text.split(spaceBinaryOperator)[0],
					'rhs': text.split(spaceBinaryOperator)[1]
				}

def isNumber(text):
	if isinstance(text, int) or re.match(r'^\d+$', str(text)):
		return True
	return False

def isWord(text):
	return re.match(r'^\w+$', str(text))

def dependsOn(operation):
	depends = [];

	if 'lhs' in operation and not isNumber(operation['lhs']):
		depends.append(operation['lhs'])

	if 'rhs' in operation and not isNumber(operation['rhs']):
		depends.append(operation['rhs'])

	if 'value' in operation and not isNumber(operation['value']):
		depends.append(operation['value'])

	return depends

wires = {}

for line in input.split("\n"):
	parsedLine = parseInputLine(line)
	wires[parsedLine['output']] = parsedLine['operation']


def areDependentsConstant(depends):
	return len(depends) == 0 or all(isNumber(wires[item]) for item in depends)

def get(wireName, field):
	if wires[wireName][field] in wires:
		return wires[wires[wireName][field]]
	else:
		return wires[wireName][field]

def evaluateWires(wires):
	for wireName, wire in wires.iteritems():
		if not isNumber(wire):
			if areDependentsConstant(wire['depends']):
				func = OperatorFunctions[wire['operator']]
				if wire['operator'] in BinaryOperators:
					wires[wireName] = func(get(wireName, "lhs"), get(wireName, "rhs"))
				else:
					wires[wireName] = func(get(wireName, "value"))

wiresCopy = copy.deepcopy(wires)

while not all(isNumber(value) for value in wires.values()): evaluateWires(wires)
print "Part 1, wire a:", wires['a']

aWire = wires['a']
wires = wiresCopy
wires['b'] = aWire
while not all(isNumber(value) for value in wires.values()): evaluateWires(wires)
print "Part 2, wire a:", wires['a']
