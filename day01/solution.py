input = open('data', 'r').read()

def floorsAt(index = len(input)):
	return input.count('(', 0, index) - input.count(')', 0, index)

def part2():
	index = 1

	while floorsAt(index) >= 0:
		index += 1

	return index

print "Part 1: " + str(floorsAt())
print "Part 2: " + str(part2())
