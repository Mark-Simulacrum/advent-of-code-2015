row = 2978;
column = 3083;
iterations = (row + column - 2) * (row + column - 1) / 2 + column;

currentCode = 20151125;
for _ in range(1, iterations):
	currentCode = (currentCode * 252533) % 33554393

print "Part 1:", currentCode
