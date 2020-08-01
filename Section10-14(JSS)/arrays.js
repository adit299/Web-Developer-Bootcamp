// Indices start at 0, I should be starting at array.length - 1
// not int, it is var!!!
// Note for forEach, it is an array method, so it should be called as array.forEach

function printReverse(array) {
	for(let i = array.length - 1; i >= 0; i--) {
		console.log(array[i]);
	}
}

// I forgot to make it a double equals

// For this problem, we cannot use a forEach loop
// since, when false is returned, only the forEach scope
// is exited, not the entire function, so true is always returned
// Thus, a for loop provides a more straightforward way of tackling
// this problem
// function isUniform(array) {
// 	let firstElem = array[0]

// 	array.forEach(function(obj) {
// 		if (obj !== firstElem) {
// 			return false;
// 		}
// 	});

// 	return true;
// }

function isUniform(array) {
	let firstElem = array[0]

	for (var i = 1; i < array.length; i++) {
		if(firstElem !== array[i]) {
			return false;
		}
	}

	return true;
}

function sumArray(array) {
	let sum = 0;
	
	array.forEach(function(num) {
		sum += num;
	});

	return sum;
}


function max(array) {
	let max = array[0];

	array.forEach(function(num) {
		if(num > max) {
			max = num;
		}
	});

	return max;
}













