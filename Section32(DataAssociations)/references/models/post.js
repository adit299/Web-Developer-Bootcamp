const mongoose = require("mongoose");


// POST - title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});


// This line of code allows us to export the schema out, to be imported in other files
module.exports = mongoose.model("Post", postSchema);