def sameHead(input, startAt):
	firstChar = input[startAt]
	index = startAt + 1

	while index < len(input) and input[index] is firstChar:
		index += 1

	return index - startAt

def applyOperation(input):
	result = ""
	summativeHeadLength = 0

	while summativeHeadLength < len(input):
		howMany = sameHead(input, summativeHeadLength)

		result += str(howMany) + input[summativeHeadLength]
		summativeHeadLength += howMany

	return result

data = "1113222113"
for i in range(50):
	data = applyOperation(data)
	print "Iteration:", str(i), "; Data length:", len(data)
