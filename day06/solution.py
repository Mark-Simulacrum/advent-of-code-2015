import re

input = open("data", "r").read()

lights = []
for _ in xrange(1000):
	lights.append([0] * 1000)

def toggle(x, y):
	lights[x][y] += 2

def turnOn(x, y):
	lights[x][y] += 1

def turnOff(x, y):
	if lights[x][y] > 0:
		lights[x][y] -= 1

for line in input.split("\n"):
	startX, startY, endX, endY = map(int, re.search('(\\d+),(\\d+) through (\\d+),(\\d+)', line).groups())

	appliedFunction = None
	if line.startswith("turn on"):
		appliedFunction = turnOn
	elif line.startswith("turn off"):
		appliedFunction = turnOff
	else: # toggle
		appliedFunction = toggle

	for x in xrange(startX, endX + 1):
		for y in xrange(startY, endY + 1):
			appliedFunction(x, y)

print "Light level:", sum(map(sum, lights))
