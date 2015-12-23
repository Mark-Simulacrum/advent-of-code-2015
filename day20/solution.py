requiredPresents = 34000000

def firstHouse(presentsPerHouse, stopAt50):
	endCond = int(requiredPresents / presentsPerHouse)

	houses = [10] * endCond # Prefilling with zeros skips the first [and longest] iteration

	if stopAt50:
		for elfNum in xrange(2, endCond):
			numPresents = elfNum * presentsPerHouse
			houses[elfNum:elfNum * 51:elfNum] = [x + numPresents for x in houses[elfNum:elfNum * 51:elfNum]]

			if houses[elfNum] >= requiredPresents: return elfNum
	else:
		for elfNum in xrange(2, endCond):
			numPresents = elfNum * presentsPerHouse
			houses[elfNum:endCond:elfNum] = [x + numPresents for x in houses[elfNum:endCond:elfNum]]

			if houses[elfNum] >= requiredPresents: return elfNum

print "First house, part 1:", firstHouse(10, False)
print "First house, part 2:", firstHouse(11, True)
