var Campground = require(`../models/campground`);
var Comment = require(`../models/comment`);

// MIDDLEWARE goes here
var middlewareObj = {};

// is user logged-in
middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash(`error`, `You need to be logged in to do that!`)
	res.redirect(`/login`);
};

// check user ownership of campground
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		// is so then continue
		Campground.findById(req.params.id, function (err, foundCampground) {
			if (err) {
				req.flash(`error`, `Campground not found!`)
				res.redirect(`back`);
			} else {
				// does the user own the campground or is admin
				if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
					next();
				} else {
					req.flash(`error`, `You don't have permission to do that!`)
					res.redirect(`back`);
				}
			}
		});
	} else {
		// if not redirect to login screen
		req.flash(`error`, `You need to be logged in to do that!`)
		res.redirect(`/login`);
	}
};

// check user ownership of comment
middlewareObj.checkCommentOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		// is so then continue
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err) {
				req.flash(`error`, `Comment not found!`)
				res.redirect(`back`);
			} else {
				// does the user own the comment or is admin
				if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
					next();
				} else {
					req.flash(`error`, `You don't have permission to do that!`)
					res.redirect(`back`);
				}
			}
		});
	} else {
		req.flash(`error`, `You need to be logged in to do that!`)
		// if not redirect to login screen
		res.redirect(`back`);
	}
};

module.exports = middlewareObj;
