import json
import re

def findNumbers(string):
    return map(int, re.findall(r'(-?\d+)', string))

print "Sum of numbers:", sum(findNumbers(open("data", "r").read()))

def rejectRed(x):
    if "red" in x.values():
        return {}
    else:
        return x

jsonData = json.load(open("data", "r"), object_hook=rejectRed)
stringifiedJson = json.dumps(jsonData)

print "Sum of non-red numbers:", sum(findNumbers(stringifiedJson))



