// Connecting Mongo server
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

// Note that we have to follow up our directory with a ./ to reference that the path is from
// the current directory

// So we have now seperated the schema into seperate files
const Post = require("./models/post");
const User = require("./models/user");


Post.create({
    title: "Insert title for the Post",
    content: "This is the content for the Post"
}, function(err, post){
    // First we find the user in the database with the matching email
    // If found, we return a foundUser, if not we return an error
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            // Once we have the user found, we push the post to their posts array
            foundUser.posts.push(post);
            // We then save the user to the database with the post in their array
            foundUser.save(function(err, data){
                if(err){
                    console.log(err)
                } else {
                    console.log(data);
                }
            });
        }
    });
    // console.log(post);
});

// Create a new User
// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

// After the code is run, if we check the user's post array, we can find the
// corresponding ID to the post they make

// The following code is to find the user, and find all the posts for that user

// User.findOne will find the user with corresponding email bob@gmail.com
// .populate("posts") will look through posts and find the posts that user has
// made by checking what posts have a matching ID, then populating the posts array
// with those posts.

// .exec lets you execute the callback function

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }

// });


