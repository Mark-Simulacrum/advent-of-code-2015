import hashlib

def getMD5(str):
	return hashlib.md5(str).hexdigest()

secretKey = "iwrupvqb"

fiveZeros = '0' * 5
sixZeros = '0' * 6

i = 0
currentHash = ""
while not currentHash.startswith(fiveZeros):
	i += 1
	currentHash = getMD5(secretKey + str(i))

print "Minimum value of n to start with 5 zeros: " + str(i) + " " + currentHash

i = 0
currentHash = ""
while not currentHash.startswith(sixZeros):
	i += 1
	currentHash = getMD5(secretKey + str(i))

print "Minimum value of n to start with 6 zeros: " + str(i)
