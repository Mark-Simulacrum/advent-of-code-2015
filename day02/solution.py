presents = []

with open("data", "r") as file:
    for line in file:
        dimensions = sorted(map(int, line.split("x")))

        presents.append(dimensions)

def wrappingPerPresent(dimensions):
    return (dimensions[0] * dimensions[1] +
        2 * dimensions[0] * dimensions[1] +
        2 * dimensions[1] * dimensions[2] +
        2 * dimensions[2] * dimensions[0])

def ribbonPerPresent(dimensions):
    return (
        2 * (dimensions[0] + dimensions[1]) +
        dimensions[0] * dimensions[1] * dimensions[2]
    )

print "Wrapping Needed:", sum(map(wrappingPerPresent, presents))
print "Feet Ribbon Needed:", sum(map(ribbonPerPresent, presents))
