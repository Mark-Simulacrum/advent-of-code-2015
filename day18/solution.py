data = open("data", "r").read()

lights = []

lightRows = data.split("\n");
lights.append([False] * (len(lightRows[0]) + 2))
for y in range(len(lightRows)):
	row = [False]

	for light in lightRows[y]:
		if light == "#":
			row.append(True)
		else:
			row.append(False)

	row.append(False)
	lights.append(row)
lights.append([False] * (len(lightRows[0]) + 2))

width = len(lights[0]) - 2
height = len(lights) - 2
lights[1][1] = True
lights[1][width] = True
lights[height][1] = True
lights[height][width] = True

def getNeighbors(currentState, row, column):
	neighbors = []

	neighbors.append(currentState[row - 1][column - 1])
	neighbors.append(currentState[row - 1][column])
	neighbors.append(currentState[row - 1][column + 1])

	neighbors.append(currentState[row][column - 1])
	neighbors.append(currentState[row][column + 1])

	neighbors.append(currentState[row + 1][column - 1])
	neighbors.append(currentState[row + 1][column])
	neighbors.append(currentState[row + 1][column + 1])

	return neighbors

def nextStateLight(currentState, row, column):
	if column == 1 or column == width or row == 1 or row == height:
		return True

	if column == 0 or column == width + 1 or row == 0 or row == height + 1:
		return False

	amountNeighborsOn = len(filter(lambda a: a, getNeighbors(currentState, row, column)))

	if currentState[row][column]:
		return amountNeighborsOn == 2 or amountNeighborsOn == 3
	else:
		return amountNeighborsOn == 3

def nextState(currentState):
	newState = []
	for rowN, row in enumerate(currentState):
		if rowN == 0 or rowN == width + 1:
			newState.append(row)
			continue

		newRow = []
		for columnN in range(len(row)):
			state = nextStateLight(currentState, rowN, columnN)
			newRow.append(state)

		newState.append(newRow)

	return newState

def printState(state):
	out = ""
	for row in state:
		for light in row:
			if light:
				out += "#"
			else:
				out += "."
		out += "\n"
	return out

def amountOn(state):
	lightsOn = 0

	for row in state:
		for light in row:
			if light:
				lightsOn += 1

	return lightsOn

currentState = lights
for _ in range(100):
	currentState = nextState(currentState)

print "Lights on:", amountOn(currentState)
