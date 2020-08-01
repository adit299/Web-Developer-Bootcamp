const express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      bodyParser = require("body-parser"),
      User = require("./models/user"),
      LocalStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"); 
	   
mongoose.set('useUnifiedTopology', true);

// Connecting the MongoDB database
mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });

app = express();
// Setting the view engine to be EJS
app.set("view engine", "ejs");
// Setting up bodyParser
app.use(bodyParser.urlencoded({extended: true}));
// Adding express session
app.use(require("express-session")({
    // All information pertaining to a session will not be human readable,
    // we use the secret to encode or decode this information
    secret: "Alap is a good brother",
    // These are required parameters
    resave: false,
    saveUnitialized: false
}));


// Linking passport.js with the app
app.use(passport.initialize());
app.use(passport.session());

// Serializing and deserializaing a user
// These two methods are what is responsible for taking the user data encoding it,
// and then decoding it after the session is finished

// We also need to specify that we are using a local strategy, for user authentification
// essentially we are specifying to passport to use the local strategy from mongoose to 
// perform user authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===================
// Routes
//===================

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
})

// Authorization Routes

// Render the sign up form
app.get("/register", function(req, res){
    res.render("register");
});

// Handling user sign up (POST request to the route /register)
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        // Register is a new method which essentially takes in a username and password (we retrieved
        // both from the form), and returns a User object which contains a "hashed" password
        if(err) {
            // If an error occurs, we console.log the error, and we re-render our register form
            console.log(err);
            return res.render("register");
        }
        // Passport.authenticate will take care of all the logic required of logging a user in (serialize, deserialize,
        // starting a new session, etc.). We log the user in (using the local strategy, it could be anything from google
        // twitter), and if the login is successful, we redirect to the secret route
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});
// Note the actual password of the user is not stored on the database, just something called "salt"
// and "hash" (has to do with encrypting and decrypting)

// Login Routes

// render login form
app.get("/login", function(req, res){
    res.render("login");
});

// Here we see an example of "middleware", which is essentially
// code we can perform before the final route callback

// Here we are using passport.authenticate to see if the username and password entered
// matches anything that is stored on the database, and redirects to a page accordingly

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
    // req.logout() will log the user out, essentially it destroys all data pertaining to the 
    // current session from the user
    req.logout();
    res.redirect("/");
});

// Currently, even if a user is not logged in, he is still able to access the /secret page.
// I want to change that by creating a middleware function that will check if a user is logged in
// before allowing them to access the ./secret page.

// next is a standard middleware parameter which refers to the next thing to be called (after the
// middleware)
function isLoggedIn(req, res, next) {
    // Checks if the user is logged in
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");

}


app.listen(3000, function(){
    console.log("Password Authentication Server started...");
});

