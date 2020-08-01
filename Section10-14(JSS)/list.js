// Chrome browsers behave a little strangely when it comes alert, prompt, and confirm functions as it
// does not display the HTML on the page until after the popup is closed (we have instructions on the HTML
// about how to use the app)
// The setTimeout() function gives the HTML a half second to load before running the JS, circumventing the issue
// of the prompt function blocking the HTML from loading right away
// The todos array must be declared outside the timeout function since otherwise it will be only accessible
// in the local scope of the function, not the global scope

let todos = [];
// Use let and const as opposed to var whenever possible (var is depreciated I believe)

window.setTimeout(function() {

	var input = prompt("What would you like to do?");

	while (input !== "quit") {
		if (input === "list") {
			// Refactored the code to look cleaner
			listTodos();
		}
		else if (input === "new") {
			addTodo();
		}
		else if (input === "delete") {
			deleteTodo();
		}

		var input = prompt("What would you like to do?");
	}
	
	console.log("OK, YOU QUIT THE APP");

	function listTodos() {
		console.log("********************");
		todos.forEach(function(todo, i){
		// The forEach method can have upto three argument which refer to:
		// 1) Representing the element in the array
		// 2) Representing the index of that element
		// 3) Represents the array that .forEach was called on
			console.log(i + ": " + todo)
		});
		console.log("********************")
	}

	function addTodo() {
		let newTodo = prompt("Enter new todo");
		todos.push(newTodo);
		console.log("Added Todo");
	}

	function deleteTodo() {
		var index = prompt("Which index would you like to delete?");
		// Splice can take two arguments, the index and how many elements to remove
		// starting from the index
		todos.splice(index, 1);
		console.log("Deleted Todo");
	}

}, 500);