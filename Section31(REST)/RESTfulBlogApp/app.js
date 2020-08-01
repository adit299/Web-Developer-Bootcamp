const express = require("express"),
	  methodOverride = require("method-override"),
	  expressSanitizer = require("express-sanitizer"),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  app = express();

// Connect bodyparser, and set up view engine to be EJS
// So that we can serve our custom stylesheet (when we get to that) (line 14)
// APP CONFIG
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// Note that the sanitizer must be placed after the body parser
app.use(expressSanitizer())
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// MONGOOSE/MODEL Config
mongoose.set('useUnifiedTopology', true);
// Connecting the MongoDB database
mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true, useFindAndModify: false });

const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	// This is a new syntax, this allows us to specify that created is a date object, with a default value
	// of the current date
	created: {type: Date, default: Date.now}

});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Test Blog",
// 	image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
// 	body: "The three dogs"
// });


// RESTFUL ROUTES
app.get("/", function(req, res) {
	res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res) {
	// Retrieving all the blog posts from our MongoDB database, and diplaying them
	Blog.find({}, function(err, blogs) {
		if(err) {
			console.log("ERROR!");
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
	res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
	// Now, when we add the blog to the collection, we can
	// access all the blog elements using req.body.blog

	// Recall the issue with the body.blog, which allows
	// users to input HTML, CSS, and JS. To prevent malicious
	// script tags, we santize the input using the following line:

	req.body.blog.body = req.sanitize(req.body.blog.body);
	
	Blog.create(req.body.blog, function(err, newBlog) {
		if(err) {
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		// We search for the blog by its ID, and if its found,
		// we pass it into the EJS template.
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}

	});
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		// We search for the blog by its ID, and if its found,
		// we pass it into the EJS template.
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}

	});
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
	// This is a new mongoose method, which takes in 3 parameters:
	// Blog.findByIdAndUpdate(id, newData, callback)
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			console.log(updatedBlog);
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
	// Another Mongoose method that aids in deleting a particular
	// blog post
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, function() {
	console.log("RESTfulBlogApp Server is running!");
});
