import itertools

data = open("data", "r").read()

containers = map(int, data.split("\n"))

part1 = []
minLength = None
for length in range(len(containers)):
	combinations = itertools.combinations(containers, length)
	combinations = filter(lambda containers: sum(containers) == 150, combinations)

	part1 += combinations

	if minLength is None and len(combinations) > 0:
		minLength = length


print "Combinations (Part 1):", len(part1)

part2 = filter(lambda containers: len(containers) == minLength, part1)

print "Minimum Length Combinations (Part 2):", len(part2)
