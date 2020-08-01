var express = require("express");

var app = express();

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal/", function(req, res) {
	let animal = req.params.animal;
	let message = "The " + animal;

	if(animal === "pig") {
		message += " says 'Oink'";
		res.send(message);
	}
	else if(animal === "cow") {
		message += " says 'Moo'";
		res.send(message);
	}
	else if(animal === "dog") {
		message += " says 'Woof Woof!'";
		res.send(message);
	}
});


app.get("/repeat/:message/:num", function(req, res) {
	let message = req.params.message;
	let num = Number(req.params.num);
	let str = "";

	for(var i = 0; i < num-1; i++) {
		str += message 
		str += " ";
	}

	str += message;

	res.send(str);
});


app.get("*", function(req, res){
	res.send("Sorry, page not found...What are you doing with your life?");
});



app.listen(3000, function() {
	console.log("Server has started!");
});



