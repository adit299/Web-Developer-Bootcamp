var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var friends = ["Kyle", "Mac", "Agam", "Tony"];

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
});

app.get("/friends", function(req, res) {
	res.render("friends", {friends: friends});
});

// Whenever we want to send new data of some kind (whether it is creating a new entry, new server, etc.) we have
// to create a POST request, like the one below. In our friends.ejs file, we have created a form, with form action
// method set to /addFriend, which accesses this route.
app.post("/addfriend", function(req, res) {
	// We have added a new module known as bodyParser that will allow us to access the newFriend value from the 
	// form in friends.ejs
	var newFriend = req.body.newfriend;
	// Now we can easily push this newFriend value into our array
	friends.push(newFriend);
	// So now currently, after the friend is pushed, we are taken to a seperate webpage
	// We want to be redirected back to the page with the friends list, so we can use
	// another method called res.redirect
	// res.send("YOU HAVE REACHED THE POST ROUTE!!");
	res.redirect("/friends");
});


app.listen(3000);















