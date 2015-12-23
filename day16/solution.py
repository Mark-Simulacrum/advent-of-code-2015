import re

data = open("data", "r").read()

def parseLine(line):
	data = re.match(r'^Sue \d+: (.*?)$', line, re.IGNORECASE).group(1)
	colonTraits = data.split(", ")
	traits = {}

	for pair in map(lambda trait: trait.split(": "), colonTraits):
		traits[pair[0]] = pair[1]

	return traits

def traitMatch(traitName, reading, trait):
	if traitName == "cats" or traitName == "trees":
		return int(reading) < int(trait)
	elif traitName == "pomeranians" or traitName == "goldfish":
		return int(reading) > int(trait)
	else:
		return reading == trait

hint = parseLine("sue 0: children: 3, cats: 7, samoyeds: 2, pomeranians: 3, akitas: 0, vizslas: 0, goldfish: 5, trees: 3, cars: 2, perfumes: 1")

aunts = map(parseLine, data.split("\n"))

successfulAunts = []

hintTraits = hint.keys()
for index, aunt in enumerate(aunts):
	auntTraits = aunt.keys()

	unionTraits = filter(lambda trait: trait in hintTraits, auntTraits)

	if all(traitMatch(trait, hint[trait], aunt[trait]) for trait in unionTraits):
		successfulAunts.append((index, aunt))

print map(lambda a: a[0], successfulAunts)
