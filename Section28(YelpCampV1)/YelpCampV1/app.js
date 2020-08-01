const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// We should just get used to adding this bodyParser line of code (what does it mean?)
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creek", image: "https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e5074417c2d79d0944ec5_340.jpg"},
		{name: "Granite Hill", image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e5074417c2d79d0944ec5_340.jpg"},
		{name: "Mountain Goat's Rest", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e5074417c2d79d0944ec5_340.jpg"}
	]


app.get("/", function(req, res){
	res.render("landing");
});


app.get("/campgrounds", function(req, res) {
	// We moved to the campgrounds array outside of the scope of this function, so that the array is accessible from all functions
	// We are passing through this campgrounds array, which displays each of the campgrounds, with its corresponding name and image
	res.render("campgrounds",{campgrounds:campgrounds});
});

// REST Convention: Why is both the GET and POST request named /"campgrounds"? It is part of a convention known as REST
// which we will learn more about later on in the course. This route will allow us to add new campgrounds
app.post("/campgrounds", function(req, res) {
	const name = req.body.name;
	const image = req.body.image;
	const newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	// redirect back to the campgrounds page
	res.redirect("/campgrounds");
});

// Rendering the form that makes it possible to add new campgrounds
// Remember that the body parser library that we added makes it possible for us
// to extract the data that we entered into the form
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});



app.listen(3000, function() {
	console.log("YelpCamp Server has started");
})







