// Moving the function to after the 1000 parameter means it runs after the fadeOut is completed.

// We can also fadeIn, if we set the display to None
// $("button").on("click", function() {
// 	$('div').fadeOut(1000, function() {
// 		$(this).remove();
// 	});
// });

// $("button").on("click", function() {
// 	$('div').fadeIn(1000, function() {
// 	});
// });

// Fade toggle is a Jquery function which will decide whether to fade content in or out depending
// on whether the display is currently set to being visible or not
// $("button").on("click", function() {
// 	$('div').fadeToggle(500);
// });

// We can also use animations like slideDown(), slideUp(), to animate elements sliding up or down
// we can use slideToggle() as well which will animate elements sliding up or down depending on
// what the display is currently set to 

$("button").on("click", function() {
	$('div').slideUp(1000, function(){
		// Like before, the animation supports function call back
	});
});






















