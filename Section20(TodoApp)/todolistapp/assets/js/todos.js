// check off specific todos by clicking

// $("li").click(function() {
// For both the event handlers below, we had to use on click because this lets
// the eventhandler be linked to an element that definitely exists when the page
// loads, so all our new elements can have the proper event handling elements

$("ul").on("click", "li", function() {
	// Note that we cannot define textDecoration as text-decoration
	// because we are not allowed to have hyphens in JavaScript syntax
	$(this).toggleClass("completed");

	// If we were not using the toggle class, we can say the alternate way below,
	// and it is quite convoluted.

	// if($(this).css("color") === "rgb(128, 128, 128)" {
	// 	// turn it black
	// }
	// else {
	// 	// turn it gray
	// }
});

// $("span").click(function(event) {
$("ul").on("click", "span", function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	// The event.stopPropagation() call ensures that the li event will not be triggered
	event.stopPropagation();
});

// Event Bubbling: When we trigger an event using jQuery, what we need to know
// is that the event bubbles up from where it is triggered until, we reach the 
// most parent HTML element. For example, if we added event listeners on all relevant 
// HTML elements in our program, (span, li (already exists), ul, #container, body), the events
// would trigger in that exact order.

// We can use a jQuery method known as .stopPropagation(), to cause the event to
// stop at exactly the level the event was defined, essentially preventing
// event bubbling.

$("input[type='text']").keypress(function(event) {
	// event which checks what key is being pressed
	if(event.which === 13) {
		// First we grab the todo text from input
		var todoText = $(this).val();
		// Clear the text input
		$(this).val("");
		// Create a new li and add it to the ul, containing this text
		// Append simply adds the HTML provided under the tag that it is
		// called upon
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
	}
});

// We want to add the functionality of the plus sign on our todo-list so that the add new todo
// bar is shown or hidden depending on it

$(".fa-plus").click(function() {
	$("input[type='text']").fadeToggle();
});





