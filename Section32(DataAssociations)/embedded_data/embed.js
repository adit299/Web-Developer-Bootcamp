const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo");

// POST - title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("Post", postSchema);

// // USER - email, name
// The posts array with the postSchema allows us to add post objects to the user
// The posts are embedded to the userSchema
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

const User = mongoose.model("User", userSchema);

// const newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "insert title here",
//     content: "insert content here"
// });

// // Saves the newUser to the database
// newUser.save(function(err, user) {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// // One user can have many posts, so here is code to find a particular user, and
// // attach a post to them

// User.findOne({name: "Hermione Granger"}, function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         user.posts.push({
//             title: "the title of the post pushed by user.findOne",
//             content: "the content of the post pushed by user.findOne"
//         });
//     }
//     user.save(function(err, user){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(user);
//         }
//     });
// });




