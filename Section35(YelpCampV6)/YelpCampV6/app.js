const express = require("express"),
	  app = express(),
 	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  passport = require("passport"),
	  LocalStrategy = require("passport-local"),
	  Campground = require("./models/campground"),
	  Comment = require("./models/comments"),
	  User = require("./models/user"),
	  seedDB = require("./seeds");

mongoose.set('useUnifiedTopology', true);

// Connecting the MongoDB database
mongoose.connect("mongodb://localhost/yelp_camp_v6", { useNewUrlParser: true });


// We should just get used to adding this bodyParser line of code (what does it mean?)
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// Linking the stylesheet to the app.js file
app.use(express.static(__dirname + "/public"));

// We "seed" the database, or remove existing campgrounds and
// add in new ones
seedDB();

// PASSPORT CONFIGURATION
// Starting an express session (see the user authentication file to know what
// these all mean)
app.use(require("express-session")({
	secret: "Alap is a good brother",
	resave: false,
	saveUninitialized: false
}));

// See the authentication demo to see what these all mean
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Here is an example of a middleware that we can call to run on all the routes
// We are passing a variable of CurrentUser, with value req.user to all the routes
// on the template. Then, once its passed, we move on to the actual code of the body
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

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
			// So note that req.user will contain all the data about a user, if one is 
			// currently logged in.
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	});
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
	res.render("campgrounds/new");
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
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// ==========================================================
// COMMENTS ROUTES
// ==========================================================

// NEW Route - allows us to add a comment to a campground
// The middle ware checks if a user is LoggedIn, only allowing for comments if
// that middleware check passes
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	// Find the campground by ID, and if found, we pass in that
	// newfound campground to the comments/new ejs file
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}		
	});
});

// POST Route - allows us to post the comment to the database
app.post("/campgrounds/:id/comments",  isLoggedIn, function(req, res){
	// lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			// if we encounter an error (ex. campground not found) we 
			// redirect back to the campgrounds page
			res.redirect("/campgrounds");
		}
		else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					// Create the new comment and push it to the comments section of
					// the campground
					// Save the campground with the comments
					// Redirect to the campground show page
					
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	});
});

// =========
// AUTH ROUTES
// =========

// Render the register form
app.get("/register", function(req, res){
	res.render("register");
});

// Handle the sign up logic (Post request to register)
app.post("/register", function(req, res){
	const newUser = new User({username: req.body.username});
	// Passport logic to create a new user
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

// Show the login form
app.get("/login", function(req, res){
	res.render("login");
});

// Handling login logic (POST request to login)
app.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login" 
	}), function(req, res){

});

// Logout route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");

}


app.listen(3000, function() {
	console.log("YelpCamp Server has started");
});







