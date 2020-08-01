var moviedb = [
{name: "Split",
 haveWatched: true,
 rating: 4.5
},
{name: "Old Boy",
 haveWatched: false,
 rating: 5
}
];

moviedb.forEach(function(movie){
	if(movie.haveWatched){
		console.log("You have watched " + "\"" + movie.name + "\"" + " - " + movie.rating + " stars");
	}
	else {
		console.log("You have not seen " + "\"" + movie.name + "\"" + " - " + movie.rating + " stars");
	}

});









