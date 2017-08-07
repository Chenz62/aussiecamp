var express = require(`express`);
var app = express();
var bodyParser = require(`body-parser`);
var expressSanitizer = require("express-sanitizer");
var mongoose = require(`mongoose`);
var flash = require(`connect-flash`);
var passport = require(`passport`);
var LocalStrategy = require(`passport-local`);
var methodOverride = require(`method-override`);
var passportLocalMongoose = require(`passport-local-mongoose`);
var Campground = require(`./models/campground`);
var Comment = require(`./models/comment`);
var User = require(`./models/user`);
// var seedDB = require(`./seeds`);

var campgroundRoutes = require(`./routes/campgrounds`);
var commentRoutes = require(`./routes/comments`);
var indexRoutes = require(`./routes/auth`);

require('dotenv').config();

// CONNECT to mongoose
// replace the deprecated mongoose.Promise library
// this will need installing in a terminal with "npm install bluebird --save"
var bluebird = require('bluebird');
mongoose.Promise = bluebird; // mongoose recommend bluebird as a promise library for MongoDB

// connect to the database
mongoose.connect(`${process.env.DB_SERVER_URL}`, {
	promiseLibrary: require('bluebird'), // mongoose docs recommend this go here too
	useMongoClient: true // add useMongoClient:true to fix the "open() =>v4.11.0" deprecation warning
})
.then(function () { // might as well use the promise library
	console.log('MongoDB has been connected!');
})
.catch(function (error) { // show error if database is not available
	console.error('Error while trying to connect with MongoDB!');
	console.error(error);
});

// SETUP App
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set(`view engine`, `ejs`);
app.use(express.static(__dirname + `/assets`));
app.use(expressSanitizer());
app.use(methodOverride(`_method`));
app.use(flash());
app.locals.moment = require(`moment`);

// PASSPORT Configuration
app.use(require(`express-session`)({
	secret: `Hello cruel world`,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash(`error`);
	res.locals.success = req.flash(`success`);
	next();
});

app.use(`/campgrounds`, campgroundRoutes);
app.use(`/campgrounds/:id/comments`, commentRoutes);
app.use(`/`, indexRoutes);

// SEED  the database with dummy-data
// seedDB();

// APP Listener //
app.listen(process.env.PORT, process.env.IP, function () {
	console.log(`The "YelpCamp" server has started! ` + process.env.PORT);
});
