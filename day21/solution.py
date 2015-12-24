import pprint
import itertools

# Cost, Damage, Armor

# 1 weapon
weapons = (
	(8, 4, 0),
	(10, 5, 0),
	(25, 6, 0),
	(40, 7, 0),
	(74, 8, 0)
)

# 0 - 1 armor
armor = (
	(13, 0, 1),
	(31, 0, 2),
	(53, 0, 3),
	(75, 0, 4),
	(102, 0, 5)
)

# 0 - 2 rings
rings = (
	(25, 1, 0),
	(50, 2, 0),
	(100, 3, 0),
	(20, 0, 1),
	(40, 0, 2),
	(80, 0, 3)
)

possibleWeapon = list(weapons)
possibleArmor = list(armor) + [(0, 0, 0)]
a = map(lambda (a, b): (a[0] + b[0], a[1] + b[1], a[2] + b[2]), itertools.combinations(rings, 2))
possibleRing = a + list(rings) + [(0, 0, 0)]

def attackStrength(attack, defence):
	fullStrength = attack - defence
	if fullStrength < 1: fullStrength = 1
	return fullStrength

# [hp, damage, armor]
def playerWon(me, boss):
	playerTurn = True
	while me[0] > 0 and boss[0] > 0:
		if playerTurn:
			boss[0] -= attackStrength(me[1], boss[2])
		else:
			me[0] -= attackStrength(boss[1], me[2])

		playerTurn = not playerTurn

	return me[0] > 0

def getCost(combination):
	return combination[0][0] + combination[1][0] + combination[2][0]

def getMyStats(combination):
	return [
		100,
		combination[0][1] + combination[1][1] + combination[2][1],
		combination[0][2] + combination[1][2] + combination[2][2]
	]


minimumWinCost = 10 ** 10 # This is simply a really large value (as we want the minimum)
for combination in itertools.product(possibleWeapon, possibleArmor, possibleRing):
	cost = getCost(combination)

	if cost < minimumWinCost and playerWon(getMyStats(combination), [109, 8, 2]):
		minimumWinCost = cost

print "Minimum cost to win: ", minimumWinCost

maximumLossCost = 0
for combination in itertools.product(possibleWeapon, possibleArmor, possibleRing):
	cost = getCost(combination)

	if cost > maximumLossCost and not playerWon(getMyStats(combination), [109, 8, 2]):
		maximumLossCost = cost

print "Maximum cost to lose:", maximumLossCost
