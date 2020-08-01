const mongoose = require("mongoose");


// Schema Setup
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Setting up campground collection on database, and exporting it out of the file, so that we can
// import it on the app.js file
module.exports = mongoose.model("Campground", campgroundSchema);