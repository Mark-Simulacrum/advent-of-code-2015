
data = open("data", "r").read()

ingredients = []

for line in data.split("\n"):
	name = line.split(": ")[0]

	properties = line.split(": ")[1].split(", ")

	props = { 'value': 0 }
	for prop in properties:
		props[prop.split(" ")[0]] = int(prop.split(" ")[1])

	ingredients.append(props)

def getPropertyScore(property, ingredients):
	value = 0
	for ingredient in ingredients:
		value += ingredient[property] * ingredient['value']

	if value <= 0:
		return 0
	else:
		return value

def calculateScore(ingredients):
	score = getPropertyScore("capacity", ingredients)
	score *= getPropertyScore("durability", ingredients)
	score *= getPropertyScore("flavor", ingredients)
	score *= getPropertyScore("texture", ingredients)

	calories = getPropertyScore("calories", ingredients)

	return score, calories

def addValue(ingredient, value):
	ingredient['value'] = value
	return ingredient

maxScore = -100

optionsTried = 0
for i in xrange(1, 100):
	for j in xrange(1, 100 - i):
		for k in xrange(1, 100 - i - j):
			h = 100 - i - j - k

			scoreInput = [
				addValue(ingredients[0], i),
				addValue(ingredients[1], j),
				addValue(ingredients[2], k),
				addValue(ingredients[3], h)
			]

			score, calories = calculateScore(scoreInput)

			if calories == 500 and maxScore < score:
				maxScore = score

			optionsTried += 1

print "maxScore:", maxScore
print "optionsTried:", optionsTried
