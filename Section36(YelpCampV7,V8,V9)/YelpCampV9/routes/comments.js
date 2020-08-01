const express = require("express"),
	//   After we refactored all our routes, the /:id part of our route
	// is housed within app.js.
	// so in order to access the id from req.id, we have to pass in mergeParams: true
	// within the router
      router = express.Router({mergeParams: true}),
      Campground = require("../models/campground"),
      Comment = require("../models/comments");


// ==========================================================
// COMMENTS ROUTES
// ==========================================================

// NEW Route - allows us to add a comment to a campground
// The middle ware checks if a user is LoggedIn, only allowing for comments if
// that middleware check passes
router.get("/new", isLoggedIn, function(req, res){
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
router.post("/", isLoggedIn, function(req, res){
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
					// We can associate a comment with a particular user id and username
					// by using req.user._id or req.user.username
					
					// Note that necessarily, we have to have a user associated with the comment
					// because this path can only be reached if a user is logged in (which we check
					// using middleware), isLoggedIn
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					
					// Save the commemt amd push it
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");

}

module.exports = router;

