var lis = document.querySelectorAll("li");

for (var i = 0; i < lis.length; i++) {
	lis[i].addEventListener("mouseover", function() {
		// this.style.color = "green";
		this.classList.add("selected");
	});
	
	lis[i].addEventListener("mouseout", function() {
		// this.style.color = "black";
		this.classList.remove("selected")
	});

	lis[i].addEventListener("click", function() {
		this.classList.toggle("done");
	});
}



// Event is triggered when you put your mouse over the li
// firstLI.addEventListener("mouseover", function() {
// 	firstLI.style.color = "green";
// });

// firstLI.addEventListener("mouseout", function() {
// 	firstLI.style.color = "black";
// })


