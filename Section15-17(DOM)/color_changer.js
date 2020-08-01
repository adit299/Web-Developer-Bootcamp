// Remember that document.getElementsbyTagName returns a list containing all the elements
// with that particular tag name. The better selector to use in this situation would
// querySelector.
// See the example also for a cleaner way to do this using toggle

var button = document.getElementsByTagName("button")[0];
var body = document.getElementsByTagName("body")[0];
var isColor = false;

button.addEventListener("click", function() {
	if(isColor) {
		body.style.background = "white";
	}
	else {
		body.style.background = "purple";
	}
	isColor = !isColor;
	
});

























