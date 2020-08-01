$("li").text();
// This will return a single string containing all the li elements

$("h1").text("New Text");
// Passing in new text will cause the h1 text to change to this particular text


// If we had changed the li text, this would've caused all the li elements to have different text
// $("li").text("new text");


// We can use the .html method to change the core HTML of the particular element
$('ul').html("<li>Hacked the ul using JQuery!</li>")


// Like before this will change the elements of all the li elements
$('li').html("<a href='google.com'>CLICK ME TO GO TO GOOGLE</a>")

// If we had an image tag, we can change it using the following JQuery code
// $("img:first-of-type").attr("src", "insert the image url here");

// We can also access the last img using this Jquery code
// $("img").last().attr("src", "insert the image url here");


// We can use the .val method to access the value of something the user has inputted
// we can access the value of any element which has a value attribute

$("select").val();

// The code above will access the value that the user selects from a dropdown menu

// We can also use the methods of .addClass, .removeClass, and .toggleClass, to do what exactly the name implies to add/remove CSS classes
// to various elements

$('h1').addClass("correct");

$('li').addClass("wrong");

// Toggle class will add a class to a particular element if the class does not already exist on that element, otherwise, it removes the class
$('li').toggleClass("done");




















