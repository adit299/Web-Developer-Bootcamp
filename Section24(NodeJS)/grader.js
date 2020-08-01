function average(scores) {

	total = 0;

	for(var i = 0; i < scores.length; i++) {
		total += scores[i];
	}

	console.log(Math.round(total/scores.length));
	return Math.round(total/scores.length);


}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores2);
