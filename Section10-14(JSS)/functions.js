function isEven(num) {
	return num % 2 === 0;
}

function factorial(num) {
	val = 1;
	while (num != 0) {
		val *= num;
		num--;
	}
	return val;
}

// I couldn't get this one, the answer was to use a regular expression solution.

function kebabToSnake(str) {
	var myString = str.replace(/-/g, "_");
    return myString;
}







