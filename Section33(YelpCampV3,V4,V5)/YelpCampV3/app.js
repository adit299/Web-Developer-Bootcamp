const express = require("express"),
	  app = express(),
 	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  Campground = require("./models/campground"),
	  seedDB = require("./seeds");

// We start by "seeding" the database, or removing existing campgrounds and
// adding in new ones
seedDB();

mongoose.set('useUnifiedTopology', true);

// Connecting the MongoDB database
mongoose.connect("mongodb://localhost/yelp_camp_v4", { useNewUrlParser: true });


// Campground.create(
// 	{
// 		name: "Mountain Goat's Rest", 
// 		image: "https://images.unsplash.com/photo-1490452322586-70484206da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
// 		description: "A place where moutain goats take rest. Annoying creatures."
// 	},
// 	function(err, campground) {
// 		if(err) {
// 			console.log(err)
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}
// });


// We should just get used to adding this bodyParser line of code (what does it mean?)
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("landing");
});

// INDEX
app.get("/campgrounds", function(req, res) {
	// As opposed to V1, we have to now retrieve our campgrounds from the database as opposed to an array
	// We used the find method, paired with blank parameters, to retrieve all the campgrounds
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds:allCampgrounds});
		}
	});

	// res.render("campgrounds",{campgrounds:campgrounds});
});

// CREATE

// REST Convention: Why is both the GET and POST request named /"campgrounds"? It is part of a convention known as REST
// which we will learn more about later on in the course. This route will allow us to add new campgrounds
app.post("/campgrounds", function(req, res) {
	// From V1 to V2, we have to change this code so that now, we will add a new campground to the database,
	// as opposed to pushing to an array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const newCampground = {name: name, image: image, description: desc};

	Campground.create(newCampground, function(err, campGround){
		if(err) {
			console.log(err);
		} else {
		// redirect back to the campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

// NEW

// Rendering the form that makes it possible to add new campgrounds
// Remember that the body parser library that we added makes it possible for us
// to extract the data that we entered into the form
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

// SHOW
// Adding a Description to each of our campgrounds

app.get("/campgrounds/:id", function(req, res) {
	// This is a new MongoDB method which lets us search for a particular 
	// campground by id. req.params.id lets us retrieve the id.
	// Recall, just like the blogs example, we call the populate function on "comments"
	// and execute this function, to populate the comments array with the actual comments
	// as opposed to just the references
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			// If the campground is found, we render the show page, and we
			// pass to it the found campground object 
			res.render("show", {campground: foundCampground});
		}
	});
});



app.listen(3000, function() {
	console.log("YelpCamp Server has started");
});







