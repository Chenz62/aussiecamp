var express = require(`express`);
var router = express.Router();
var expressSanitizer = require(`express-sanitizer`);
var Campground = require(`../models/campground`);
var middleware = require(`./middleware`);
var geocoder = require(`geocoder`);


// INDEX - show all camgrounds
router.get(`/`, function (req, res) {
	var noMatch = null;
	if (req.query.search) {
		var regex = new RegExp(escapeRegex(req.query.search), `gi`);
		// get all campgrounds from the database
		Campground.find({
			name: regex
		}, function (err, allCampgrounds) {
			if (err) {
				console.log(err);
			} else {
				if (allCampgrounds.length < 1) {
					noMatch = `No campgrounds match that search, please try again!`;
				}
				res.render(`campgrounds/index`, {
					campgrounds: allCampgrounds,
					noMatch: noMatch
				});
			}
		});
	} else {
		// get all campgrounds from the database
		Campground.find({}, function (err, allCampgrounds) {
			if (err) {
				console.log(err);
			} else {
				res.render(`campgrounds/index`, {
					campgrounds: allCampgrounds,
					noMatch: noMatch
				});
			}
		});
	}
});

// CREATE - add new campground to database
router.post(`/`, middleware.isLoggedIn, function (req, res) {
	// get data from form
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var cost = req.body.cost;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	geocoder.geocode(req.body.location, function (err, data) {
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;
		var location = data.results[0].formatted_address;
		// var description = req.sanitize(req.body.campground.description);
		var newCampground = {
			name: name,
			image: image,
			cost: cost,
			description: description,
			author: author,
			location: location,
			lat: lat,
			lng: lng
		};
		// create a new campground and save to the database
		req.body.description = req.sanitize(req.body.description);
		Campground.create(newCampground, function (err, newlyCreated) {
			if (err) {
				console.log(err);
			} else {
				// redirect back to campgrounds page
				res.redirect(`/campgrounds`);
			}
		});
	});
});

// NEW - show form to create a new campground
router.get(`/new`, middleware.isLoggedIn, function (req, res) {
	res.render(`campgrounds/new`);
});

// SHOW - more info about a campground
router.get(`/:id`, function (req, res) {
	// find campground with provided ID
	Campground.findById(req.params.id).populate(`comments`).exec(function (err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			// render show template with that campground
			res.render(`campgrounds/show`, {
				campground: foundCampground
			});
		}
	});
});

// EDIT - show edit form for a campground
router.get(`/:id/edit`, middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findById(req.params.id, function (err, foundCampground) {
		res.render(`campgrounds/edit`, {
			campground: foundCampground
		});
	});
});

// UPDATE - update the campground
router.put(`/:id`, middleware.checkCampgroundOwnership, function (req, res) {
	geocoder.geocode(req.body.location, function (err, data) {
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;
		var location = data.results[0].formatted_address;
		var newData = {
			name: req.body.name,
			image: req.body.image,
			description: req.body.description,
			cost: req.body.cost,
			location: location,
			lat: lat,
			lng: lng
		};
		req.body.description = req.sanitize(req.body.description);
		Campground.findByIdAndUpdate(req.params.id, {
			$set: newData
		}, function (err, updatedCampground) {
			if (err) {
				req.flash(`error`, err.message);
				res.redirect(`back`);
			} else {
				req.flash(`success`, `Successfully Updated!`);
				res.redirect(`/campgrounds/` + req.params.id);
			}
		});
	});
});

// DESTROY - remove a campground
router.delete(`/:id`, middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.redirect(`/campgrounds`);
		} else {
			req.flash(`success`, `Campground deleted!`);
			res.redirect(`/campgrounds`);
		}
	});
});

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$!&\s]/g, `\\$&`)
};

module.exports = router;
