data = open("data", "r").read()

codeCharacters = 0
encodedCharacters = 0

for line in data.split("\n"):
	encodedLine = line.replace('\\', '\\\\').replace('"', '\\\"')

	codeCharacters += len(line);
	encodedCharacters += len(encodedLine) + 2;

print "Code Characters:", codeCharacters
print "Mem Chars:", encodedCharacters;
print "Difference:", encodedCharacters - codeCharacters;
