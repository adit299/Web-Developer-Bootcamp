// Making request calls using Node, we are using a library called 'request' (fully deprecated, so should look at some alternatives)
// We make a request to a particular URL, and we are returned the resulting HTML code, from the webpage

// const request = require('request');

// request('http://www.google.com', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// const request = require('request');

// // Error is true if some error occured, and we can use statusCode to access the status code that the webpage returns, to
// // see if our request was successful

// // We installed a new devDependency called locus by calling npm i -D locus@2.0.0 (i is short for install, and D is short
// // for devDependencies). This dependency lets us freeze code at a particular point so that we can analyze them further.

// // We can also use the arrow notation which is the same as writing out the function
// // request('https://jsonplaceholder.typicode.com/users/1', function(error, response, body){
// request('https://jsonplaceholder.typicode.com/users/1', (error, response, body) => {
// 	if(!error && response.statusCode == 200) {
// 		const parsedData = JSON.parse(body);
// 		console.log(parsedData['name'] + ' lives in ' + parsedData['name']['address']);
// 		// Some newer string syntax (ES6 temporal syntax). The dollar sign and enclosing
// 		// braces let us access variables from the code itself
// 		console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
// 	}
// });

// Another way of handling requests is through something called promises. They do the same things, promises are just
// syntatically different


const rp = require('request-promise');

rp('https://jsonplaceholder.typicode.com/users/1')
 .then((htmlstring) => {
 	const parsedData = JSON.parse(htmlstring);
 	console.log(htmlstring);
 })
 .catch((err) => {
 	console.log(err);
 })


