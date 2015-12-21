santaPosition = [0, 0]
roboSantaPosition = [0, 0]

uniquePositions = set()

input = open("data", "r").read()
for index, char in enumerate(input):
	position = []

	if index % 2 == 0:
		position = santaPosition
	else:
		position = roboSantaPosition

	if char is '^':
		position[0] += 1
	elif char is 'v':
		position[0] -= 1
	elif char is '>':
		position[1] += 1
	elif char is '<':
		position[1] -= 1

	uniquePositions.add(tuple(position))

print "Happy Houses:", len(uniquePositions)
