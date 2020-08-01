// Requiring Mongoose
var mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);

// We connect to a server name of our choosing
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

// The Schema defines a pattern which we expect all data elements
// to follow that is part of this collection
// Doesn't this mean our database is Tabular? No, not really because
// we still need some kind of pattern for our data to follow (for example,
// what if we decided to print out all our elements?), we cannot
// leave it completely open ended

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

// This will create a collection called "Cats" in our database that will hold
// all of our data. The name in parentheses has to be the singular version of our
// data elements, MongoDB has a smart enough library that will automatically pluralize the element
var Cat = mongoose.model("Cat", catSchema);

// Adding a new Cat to the Database
// var george = new Cat({
// 	name: "George",
// 	age: 11,
// 	temperament: "Grouchy"
// });

// // Instead of blindly adding the element to our database, we can add a callback function which
// // will return some status that either confirms or denies, that the cat was added successfully to the database
// george.save(function(err, cat) {
// 	if(err) {
// 		console.log("CAT WAS NOT SAVED CORRECTLY TO THE DATABASE");
// 	}
// 	else {
// 		console.log("CAT WAS SAVED CORRECTLY");
// 		console.log(cat);
// 	}
// });

// Before we split up the task of creating a new cat and adding it to the database, we can do that it in one step
// using the create method
Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"

}, function(err, cat) {
	if(err) {
		console.log(err);
	} else {
		console.log(cat);
	}
});






// retrieve all cats from the Database and console.log each one
// We can use the find method to retrieve cats from the database, however,
// passing in the empty parameters will retrieve all the cats
Cat.find({}, function(err, cats) {
	if(err) {
		console.log("An Error has occured");
		console.log(err);
	}
	else {
		console.log("ALL THE CATS...");
		console.log(cats);
	}

});



