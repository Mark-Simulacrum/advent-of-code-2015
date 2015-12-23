import re

data = open("data", "r").read()

possibleReplacements = {}
possibleReverseReplacements = {}
for replacement in data.split("\n"):
	lhs, rhs = replacement.split(" => ")

	if lhs in possibleReplacements:
		if rhs not in possibleReplacements[lhs]:
			possibleReplacements[lhs].append(rhs)
	else:
		possibleReplacements[lhs] = [rhs];

	if rhs in possibleReverseReplacements:
		if lhs not in possibleReverseReplacements[rhs]:
			possibleReverseReplacements[rhs].append(lhs)
	else:
		possibleReverseReplacements[rhs] = [lhs];

inputMolecule = "CRnSiRnCaPTiMgYCaPTiRnFArSiThFArCaSiThSiThPBCaCaSiRnSiRnTiTiMgArPBCaPMgYPTiRnFArFArCaSiRnBPMgArPRnCaPTiRnFArCaSiThCaCaFArPBCaCaPTiTiRnFArCaSiRnSiAlYSiThRnFArArCaSiRnBFArCaCaSiRnSiThCaCaCaFYCaPTiBCaSiThCaSiThPMgArSiRnCaPBFYCaCaFArCaCaCaCaSiThCaSiRnPRnFArPBSiThPRnFArSiRnMgArCaFYFArCaSiRnSiAlArTiTiTiTiTiTiTiRnPMgArPTiTiTiBSiRnSiAlArTiTiRnPMgArCaFYBPBPTiRnSiRnMgArSiThCaFArCaSiThFArPRnFArCaSiRnTiBSiThSiRnSiAlYCaFArPRnFArSiThCaFArCaCaSiThCaCaCaSiRnPRnCaFArFYPMgArCaPBCaPBSiRnFYPBCaFArCaSiAl"

inputAtoms = re.findall(r'[A-Z][a-z]?', inputMolecule)

synthesizeable = []
for inputAtom in inputAtoms:
	if inputAtom in possibleReplacements:
		synthesizeable.append([inputAtom] + possibleReplacements[inputAtom])
	else:
		synthesizeable.append([inputAtom])

def getCombinations(array):
	combinations = []

	firstElements = map(lambda a: a[0], array)

	for index, current in enumerate(array):
		before = "".join(firstElements[:index])
		after = "".join(firstElements[index + 1:])

		for x in range(1, len(current)):
			value = current[x]

			combinations.append(before + value + after)

	return combinations

print "Distinct molecules after one replacement:", len(set(getCombinations(synthesizeable)))

# This solution is credited to /u/askalski ; https://www.reddit.com/r/adventofcode/comments/3xflz8/day_19_solutions/cy4etju
print "Replacements to get to medicine molecule from 'e':", \
	len(inputAtoms) - \
	len(filter(lambda a: a == "Rn" or a == "Ar", inputAtoms)) - \
	2 * len(filter(lambda a: a == "Y", inputAtoms)) - 1
