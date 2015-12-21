import string

input = "hxbxwxba"

alphabet = string.ascii_lowercase

def getNextChar(char):
	if doesWrap(char):
		return "a"
	else:
		return alphabet[alphabet.index(char) + 1]

def doesWrap(char):
	return alphabet.index(char) is alphabet.index("z")

def incrementPassword(input):
	inputChars = list(input)

	wrappedLetters = 0

	while len(inputChars) > 0:
		lastChar = inputChars.pop()

		if doesWrap(lastChar):
			wrappedLetters += 1
		else:
			if wrappedLetters > 0:
				return "".join(inputChars) + getNextChar(lastChar) + "a" * wrappedLetters
			else:
				return "".join(inputChars) + getNextChar(lastChar)

def isConsecutive(array):
	previousValue = array[0] - 1 # Fake that the first value will be consecutive
	for value in array:
		if value - previousValue != 1:
			return False
		else:
			previousValue = value
	return True

def isCorrectPassword(password):
	if "i" in password or "o" in password or "l" in password:
		return False

	didBreak = False
	passwordIndexes = map(alphabet.index, list(password))
	for i in xrange(len(password) - 2):
		threeIndexes = passwordIndexes[i:i + 3]

		if isConsecutive(threeIndexes):
			didBreak = True
			break

	if not didBreak:
		return False

	pairSeen = None
	for i in xrange(len(password) - 1):
		if password[i] == password[i + 1]:
			str = password[i:i + 2]

			if pairSeen and str != pairSeen:
				return True

			pairSeen = str

	return False

currentPassword = "hxbxwxba" # hxbxxyzz

i = 0
print "Santa's original password:", currentPassword
while not isCorrectPassword(currentPassword):
	i += 1
	currentPassword = incrementPassword(currentPassword)
	# print 1, i, currentPassword

print "Santa's first password:", currentPassword

currentPassword = incrementPassword(currentPassword)

while not isCorrectPassword(currentPassword):
	i += 1
	currentPassword = incrementPassword(currentPassword)
	# print 2, i, currentPassword

print "Santa's second password:", currentPassword
print "iterations:", i
