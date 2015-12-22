import itertools
import re

data = open("data", "r").read();

people = {}

for line in data.split("\n"):
	withWhom = re.search(r'to (\w+)\.', line).group(1)
	amount = int(re.search(r'\d+', line).group(0))

	person = line.split(" ")[0]

	if person not in people:
		people[person] = {}

	if "Me" not in people:
		people["Me"] = {}

	posOrNeg = 1
	if 'lose' in line:
		posOrNeg = -1

	people[person][withWhom] = posOrNeg * amount

	people[person]["Me"] = 0
	people["Me"][person] = 0

def sittingNextTo(name, array):
	index = array.index(name);

	if index == 0:
		return {
			'left': array[len(array) - 1],
			'right': array[index + 1]
		}
	elif index == len(array) - 1:
		return {
			'left': array[index - 1],
			'right': array[0]
		}
	else:
		return {
			'left': array[index - 1],
			'right': array[index + 1]
		}

def calculateHappiness(array):
	happiness = 0;

	for name in array:
		seatedBeside = sittingNextTo(name, array)

		happiness += people[name][seatedBeside['left']];
		happiness += people[name][seatedBeside['right']];

	return happiness

def calculateBest(keys):
	bestHappiness = -10 * 100000 * 100000
	for permutation in itertools.permutations(keys):
		happiness = calculateHappiness(permutation)

		if happiness > bestHappiness:
			bestHappiness = happiness

	return bestHappiness

keys = people.keys()
del keys[keys.index("Me")]
print "Part 1, without self:", calculateBest(keys)
print "Part 2, with self:", calculateBest(people.keys())
