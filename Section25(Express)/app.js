// Includes all the contents of the express directory
var express = require("express");
// We save all the contents to this variable called app
var app = express();

// We are going to make 3 different routes which the user can be led to
// depending on whether they make a POST or GET request

// "/" => "Hi there!" The "/" is often times known as the route path, or just the route
// req and res are just objects that we can use to retrieve/send information pertaining
// to the request or response 
// req contains all the information about the request that actually triggered this route
// res contains all the information about the response that we will respond with for the route
app.get("/", function(req, res){
	res.send("Hi there!");
});

// Now we can add another route for another path in our app
// So note that if we add a console.log into any of these sections, the content within it will
// be printed on the JavaScript console.
app.get("/bye", function(req, res){
	res.send("Goodbye");
});

app.get("/dog", function(req, res){
	// console.log("Someone made a request to /dog!!!");
	res.send("MEOW!");
});


// Think about a website like reddit, which is comprised of millions of individual subreddits
// Writing a get request and a seperate route for each of these paths would be time consuming and inpractical
// We use route parameters like the one below (:subredditName) to re-route to a different path depending on the request made
app.get("/r/:subredditName", function(req, res) {
	console.log(req.params);
	res.send("WELCOME TO A SUBREDDIT");
});

// We can also chain together multiple request parameters like follows
// When we do conole.log(req.params), it allows us to see exactly what request parameters 
// where fulfilled to reach the page
// req.params is a JSON object, so as usual we can access individual parts of it easily.
app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
	console.log(req.params);
	var subreddit = req.params.subredditName;
	res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT COMMENTS PAGE!");
});


// Let's say we wanted a route that will respond whenever we access a route that is not predefined
// In these situations, we use "*"

// Note that the order of routes matter, if we put this catch-all route at the beginning of the page,
// any route that we try to go to will be caught by this and we will return "YOU ARE A STAR"

app.get("*", function(req, res){
	res.send("YOU ARE A STAR!");
});

// We also need to add a bit of code so that Express is listening for the requests that we make
// we choose a port from which the App is listening for the requests that we make

// Now, if we go into a browser, and go to localhost3000, we will be able to view the response that 
// we sent above with the message enclosed within it

// Note that for now, anytime we make a change to the code, we have to restart the server (I can change
// that using a library in npm called nodemon)
app.listen(3000, function() {
	console.log("Server has started!");
});









