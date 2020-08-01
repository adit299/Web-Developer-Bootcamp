// USER - email, name

// As opposed to embed the posts into the userSchema, we will
// simply have an array of posts, in which we will store
// an array containing references to the posts

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    // Essentially we are declaring that the posts array contains
    // Object IDs, which each reference a POST object
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
