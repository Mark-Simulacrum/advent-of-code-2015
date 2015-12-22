import operator
import re

data = open("data", "r").read()

def parseDataLine(line):
	name, kmPerSec, speedTime, restTime = re.search(
		r'(\w+) .* (\d+) km/s for (\d+) .* (\d+)', line).groups()

	kmPerSec = int(kmPerSec)
	speedTime = int(speedTime)
	restTime = int(restTime)

	return ( name, kmPerSec, speedTime, restTime )

def getDistanceAtTime(time, reindeerObject):
	name, kmPerSec, speedTime, restTime = reindeerObject

	distanceTraveled = 0

	timeSpeeding = 0
	timeResting = 0
	isResting = False
	for _ in range(time):
		if timeSpeeding == speedTime:
			isResting = True
			timeSpeeding = 0
		elif timeResting == restTime:
			isResting = False
			timeResting = 0

		if isResting:
			timeResting += 1
		else:
			distanceTraveled += kmPerSec
			timeSpeeding += 1

	return ( distanceTraveled, reindeerObject )


def inLeadAtSecond(reindeers, second):
	distanceObjects = map(lambda reindeerObj: getDistanceAtTime(second, reindeerObj), reindeers)

	sortedDistObj = list(reversed(sorted(distanceObjects)))

	if sortedDistObj[0] == sortedDistObj[1]:
		return [sortedDistObj[0][0], sortedDistObj[1][0]]

	return [sortedDistObj[0]]

seconds = 2503
reindeers = map(parseDataLine, data.split("\n"))

reindeerNames = {}
for reindeer in reindeers:
	reindeerNames[reindeer[0]] = 0

for second in range(seconds + 1):
	inLeads = inLeadAtSecond(reindeers, second)

	for inLead in inLeads:
		reindeerNames[inLead[1][0]] += 1

a = inLeadAtSecond(reindeers, seconds)[0]
print "Part 1, in lead:", (a[1][0], a[0])
print "Part 2, in lead:", list(reversed(sorted(reindeerNames.items(), key=operator.itemgetter(1))))[0]
