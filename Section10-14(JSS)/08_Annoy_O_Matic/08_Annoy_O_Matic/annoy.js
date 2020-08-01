// var answer = prompt("are we there yet?");

// while(answer !== "yes" && answer !== "yeah") {
// 	var answer = prompt("are we there yet?");
// }

// alert("YAY, WE MADE IT!!!");


// if(answer === "yes") {
// 	alert("YAY, We made it!")
// } else {
// }

// VERSION 2
// We will stop prompting are we there yet, when the user supplies a string that contains "yes" somewhere in it

var answer = prompt("are we there yet?");

// The index of method will return the index where the first letter of that string and the rest of it occurs
// ex. str.indexOf("world") for str = "hello world" returns 6. If the index is not detected, -1 is returned

while(answer.indexOf("yes") === -1) {
	var answer = prompt("are we there yet?");
}

alert("YAY, WE MADE IT!!!");