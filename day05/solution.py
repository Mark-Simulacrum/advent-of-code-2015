import re

input = open("data", "r").read()

def isNice1(string):
	return re.search('([aeiou].*?){3}', string) and re.search('(.)\\1', string) and not re.search('ab|cd|pq|xy', string);

def isNice2(string):
	return re.search('(..).*?\\1', string) and re.search('(.).\\1', string);

print "Nice Strings (Part 1):", len(filter(isNice1, input.split('\n')))
print "Nice Strings (Part 2):", len(filter(isNice2, input.split('\n')))
