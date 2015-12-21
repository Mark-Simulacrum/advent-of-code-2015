import itertools
import re

data = open("data", "r").read()

distances = {}

for line in data.split("\n"):
	fromCity, toCity, distance = re.match('(\w+) to (\w+) = (\d+)', line).groups()
	distance = int(distance)

	if not fromCity in distances:
		distances[fromCity] = {}

	if not toCity in distances:
		distances[toCity] = {}

	distances[fromCity][toCity] = distance
	distances[toCity][fromCity] = distance

def getDistance(cities):
	distance = 0

	for index, city in enumerate(cities):
		if index > 0:
			previousCity = cities[index - 1]
			distance += distances[city][previousCity]

	return distance;

travelDistances = sorted(map(getDistance, itertools.permutations(distances.keys())))

print "Shortest distance (Part 1):", travelDistances[0]
print "Longest distance (Part 2):", travelDistances[len(travelDistances) - 1]
