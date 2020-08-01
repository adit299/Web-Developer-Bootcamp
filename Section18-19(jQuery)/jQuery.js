$("div").css("background", "purple");



// $(".highlight").css("width", "200px");
// If we want only divs with the class of highlight, we could use the selector below
$("div.highlight").css("width", "200px");


$("#third").css("border", "2px solid orange");



$("div:first-of-type").css("color", "pink");

// We could also use div:first, but this is JQuery, not native CSS so it will run a bit slower
