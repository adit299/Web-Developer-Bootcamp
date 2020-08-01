// We will write a function which will generate an array of 6 random RGB values
// var colors = generateRandomColors(6);
var numSquares = 6;
var colors = []
var pickedColor;
// An issue we face is that once we introduce the toggling between easy and hard mode,
// necessarily we might be displaying only 3 squares, but we are generating and picking
// a color out of the 6 squares, and the picked color might not be one of the ones displayed.
// this variable (numSquares) helps keep track of the number of squares being currently displayed
var squares = document.querySelectorAll(".square");
// We are just arbitrarily picking the 4th square for now, later on it will be randomized.
// now is is randomized
// var pickedColor = pickColor();
// The RGB title that we see ontop
var colorDisplay = document.getElementById("colorDisplay");
// The message title that we see, indicating whether we picked the right color
var messageDisplay = document.querySelector("#message");
// Picking the h1, so that we can add the functionality of the background color changing
// to the document
var h1 = document.querySelector("h1");
// Reset button when clicked, will start a new game
var resetButton = document.querySelector("#reset");

var modeButtons = document.querySelectorAll(".mode");

init();

// We added this function last. Init encompasses all the components of the webpage that need to load in
// at the beginning
function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	// The mode buttons intilization
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;

			// We can write the code below in one line using something known as "ternary operators", which can
			// greatly simplify our code
			// if(this.textContent === "Easy") {
			// 	numSquares = 3;
			// } else {
			// 	numSquares = 6;
			// }

			reset();

			// figure out how many squares to show
			// pick new colors
			// pick a new pickedColor
			// update page to reflect changes
		});
	}
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		// use style.backgroundColor rather than style.background since it works on all browsers
		// Changing the colors of the squares to the colors in the array
		squares[i].style.backgroundColor = colors[i];

		squares[i].addEventListener("click", function() {
			// On a click event, we save the color that is cliked to var clickedColor
			var clickedColor = this.style.backgroundColor;
			// if the clickedColor is same as picked Color
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				// Change the background of the H1 to the pickedColor.
				h1.style.backgroundColor = pickedColor;
			// if it is different
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}



function reset() {
	// We need to reset the game, so generate all new colors
	colors = generateRandomColors(numSquares);
	// pick a new random color from the array
	pickedColor = pickColor();
	// Change the display for the new pickedColor
	colorDisplay.textContent = pickedColor;
	// Change the background of the h1 back to the grayish black color
	// Adding this line ensures that we only get the play again text when we actually win the game,
	// otherwise it is not displayed.
	resetButton.textContent = "New Colors"
	h1.style.backgroundColor = "steelblue";
	// Change the color of the sqaures to the ones that we generated
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			// Another issue we run into is that when switch from easy to hard
			// the colors no longer display
			// That's why I added code above, so that all squares display before
			// we switch the difficulty level
			squares[i].style.display = "none";
		}
		// We changed the code from what it is below, so that when we swap
		// to easy mode, only squares with matching colors are displayed, the
		// rest are not shown
		// squares[i].style.backgroundColor = colors[i];
	}
	messageDisplay.textContent = "";
}



// easyBtn.addEventListener("click", function() {
// 	// Remove
// 	easyBtn.classList.add("selected");
// 	hardBtn.classList.remove("selected");
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	messageDisplay.textContent = "";

// 	for (var i = 0; i < squares.length; i++) {
// 		// If a color exists at that index, we assign it to one of the squares
// 		if (colors[i]) {
// 			squares[i].style.backgroundColor = colors[i];
// 		} else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// })

// hardBtn.addEventListener("click", function() {
// 	hardBtn.classList.add("selected");
// 	easyBtn.classList.remove("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	messageDisplay.textContent = "";

// 	for (var i = 0; i < squares.length; i++) {
// 		// If a color exists at that index, we assign it to one of the squares
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = "block";
// 	}
// })

resetButton.addEventListener("click", function() {
	// We refactored the content below into a reset function
	reset();
	// // We need to reset the game, so generate all new colors
	// colors = generateRandomColors(numSquares);
	// // pick a new random color from the array
	// pickedColor = pickColor();
	// // Change the display for the new pickedColor
	// colorDisplay.textContent = pickedColor;
	// // Adding this line ensures that we only get the play again text when we actually win the game,
	// // otherwise it is not displayed.
	// this.textContent = "New Colors";
	// // Change the background of the h1 back to the grayish black color
	// h1.style.backgroundColor = "steelblue";
	// // Change the color of the sqaures to the ones that we generated
	// for (var i = 0; i < squares.length; i++) {
	// 	squares[i].style.backgroundColor = colors[i];
	// }
	// messageDisplay.textContent = "";
});

// The color display shows the color that we picked.
// colorDisplay.textContent = pickedColor;
// can be removed since it is part of the init function

function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var colorsArray = [];

	for(var i = 0; i < num; i++) {
		colorsArray.push(randomColor());
	}

	return colorsArray;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + b + ", " + b + ")";
}



