// As opposed to adding the routes directly to the router, we have a router object, to which
// we add all the routes, and we directly export the router object to be utilized in app.js

const express = require("express"),
      router = express.Router(),
      passport = require("passport"),
      User = require("../models/user");


router.get("/", function(req, res){
	res.render("landing");
});


// =========
// AUTH ROUTES
// =========

// Render the register form
router.get("/register", function(req, res){
	res.render("register");
});

// Handle the sign up logic (Post request to register)
router.post("/register", function(req, res){
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
router.get("/login", function(req, res){
	res.render("login");
});

// Handling login logic (POST request to login)
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login" 
	}), function(req, res){

});

// Logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");

}


module.exports = router;

