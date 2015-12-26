import itertools
from operator import mul

data = map(int, open("data", "r").read().split("\n"))

def getBestPartition(nums, reducedLength):
	for combLength in range(1, len(data)):
		for combination in itertools.combinations(data, combLength):
			if sum(combination) == sum(data) / parts:
				withoutCombination = list(set(nums) - set(combination))

				# Guaranteed that the smaller set we're checking is successful
				if reducedLength == 2:
					return True
				# Check that remaining numbers in nums are partionable
				elif reducedLength < parts:
					return getBestPartition(withoutCombination, reducedLength - 1)
				# Topmost callee returns from here; (reducedLength = parts)
				elif getBestPartition(withoutCombination, reducedLength - 1):
					return combination

parts = 3
print "Quantum Entanglement, part 1:", reduce(mul, getBestPartition(data, parts))
parts = 4
print "Quantum Entanglement, part 2:", reduce(mul, getBestPartition(data, parts))

