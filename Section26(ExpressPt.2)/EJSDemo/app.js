var express = require("express");
var app = express();

// When we use this code, we are telling express to use the folders in here as the styling elements for the rest
// of the ejs files
app.use(express.static("public"));

// We can also remove the .ejs ending to each of the filenames by adding the following line of code
app.set("view engine", "ejs"); 

// We also created a folder called partials, in which we house header.ejs and footer.ejs, which contain HTML
// template code for the header and footer of any webpage, which helps us dry up our code.

// To make our webpages a bit more interesting, we can actually send html objects via res
// Another more effective method is to use ejs files (embedded javascript file). We can input HTML into that
// Note that the EJS file has to be in a seperate directory, (views is just an arbitrary name), it just has
// to be seperate from app.js
app.get("/", function(req, res) {
	// res.send("<h1>Welcome to the home page!</h1><h2>An H2 HTML object</h2>")
	res.render("home");
});

// One of the key selling points of EJS (embedded javascript), is that it allows us to embed javascript logic (loops,
// variables, etc.) right into HTML 
// Within the EJS file, anything that is enclosed within a <%= and %>, is treated as javascript logic 
// There are several types of enclosing tags that can be utilized in the EJS file, so:
// Anything enclosed with <%= and %>, will be JavaScript that will be evaluated, and immedieately rendered onto the HTML
// So for example if <%= 5+5 %>, where enclosed in the above tags, 10 would be rendered on the homepage
// On the other hand, logic (if statements, while loops), should be enclosed in <% and %> tags, so that nothing is
// rendered onto the page

app.get("/fallinlovewith/:thing", function(req, res){
	// We can use the following logic in the render brackets to pass variables from user Requests, into the
	// render call

	var thing = (req.params.thing).toUpperCase();
	res.render("love", {thingVar: thing});
});

// Example of using a for loop and looping through an array and printing
// EJS file also contains an example of using for each as well
app.get("/posts", function(req, res){
	var posts = [
		{title: "Post 1", author: "Susy"},
		{title: "My adorable pet bunny", author: "Charlie"},
		{title: "Can you believe this pomsky?", author: "Colt"}
	];

	res.render("posts", {posts: posts});

});

app.listen(3000, function() {
	console.log("Server is listening!!");
});




