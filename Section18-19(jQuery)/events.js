// Example of JQuery event handling, we can use the click method
// to add an event to the h1

$("h1").click(function() {
	alert("h1 clicked!");
});

// As opposed to vanilla JSS which would've required a for loop, and querySelectorAll
// to add event handlers on each individual button, JQuery allows us to do it much quicker
$("button").click(function() {
	alert("button clicked!");
	// Note that the brackets aronud this are required, it tells us that this is an example
	// of the JQuery this object, not javascript
	$(this).css("background", "pink");
	// We can chain together JQuery selectors as well.
	var text = $(this).text();
	console.log("You clicked " + text);
});

// There are other jQuery methods called keyup() and keydown() which will fire whenever a key is pressed
// example, if we enter a capital a (shift + a), keyup() and keydown() will fire on both the shift and a button

// On the other hand, keypress() will fire only when the actual character is entered, and return the character that
// is entered

// Passing in the event parameter into the function will let us access the event, and gain additional information
// about it

// The which parameter lets us access what key was entered, returned through numerical codes.
$("input").keypress(function(event) {
	if(event.which === 13) {
		alert("YOU HIT ENTER");
	}
})

// We can use the on method to add various event listeners to our HTML elements
$("h1").on("click", function() {
	$(this).css("color", "purple");
});

// Mouse enter triggers when the mouse enters a certain element, and mouse leave
// is after the mouse leaves that element
$("button").on("mouseenter", function() {
	$(this).css("font-weight", "bold");
});

$("button").on("mouseleave", function() {
	$(this).css("font-weight", "normal");
});

// Why use on instead of just click? Click only adds listeners to existing elements while
// on adds listeners to all potential future elements. When we add new elements, click
// may not be applied while On can reliably always add the click event.

















