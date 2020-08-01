var express = require("express");

var app = express();
const rp = require('request-promise');

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("search");
})

app.get("/results", function(req, res){
	// res.send("The route works");
	const query = req.query.search;
	const url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";

	rp(url)
		// Note that body is just a dummy variable representing the URL, we are making a request on
 		.then((body) => {
 			const data = JSON.parse(body);
 			// console.log(htmlstring);
 			// res.send(results["Search"][0]["Title"]);
 			res.render("results", {data: data});
 		})
 		.catch((err) => {
 			res.render("Encountered an error " + err);
 		})
});





app.listen(3000, function() {
	console.log("The Movie App has started");
})




