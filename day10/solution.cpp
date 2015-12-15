#include <iostream>

static int sameCharHead(const std::string &input, const int startAt) {
	const char firstChar = input[startAt];
	const int howMany = input.find_first_not_of(firstChar, startAt);
	return (howMany == std::string::npos ? input.length() : howMany) - startAt;
}

static std::string applyOperation(const std::string &input) {
	std::string result;
	int summativeHeadLength = 0;
	while (summativeHeadLength < input.length()) {
		const int headLength = sameCharHead(input, summativeHeadLength);

		result += std::to_string(headLength);
		result += input[summativeHeadLength];
		summativeHeadLength += headLength;
	}

	return result;
}

int main() {
	std::string currentData = "1113222113";

	int i;
	for (i = 1; i <= 50; i++) {
		currentData = applyOperation(currentData);

		std::cout << "Iteration:" << i << ";" << currentData.length() << "\n";
	}

	return 0;
}
