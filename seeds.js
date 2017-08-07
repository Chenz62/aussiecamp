var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment");

// seed dummy-data
var data = [
	{
		name: "Crowdy Bay National Park",
		image: "https://lh3.googleusercontent.com/proxy/dpLw_KSsdvkoPlELewV5OoRPW2PjrE3Zrax-maDQPFadRdOwHF2os299VwWeOlvyat625qEreOTWjKzhq4hTg167lK6heqI33c957iEBLfhw8r73bcYMFMYcJvYEDw11JdxvdYyD8M8zExM=s1064-w1064-h400-n",
		description: "Crowdy Bay is a national park in New South Wales, Australia, 271 km northeast of Sydney."
	},
	{
		name: "Mystery Bay",
		image: "https://lh5.googleusercontent.com/proxy/W5ivnFN-efQiizUhXdNvRMIC-LqVf62HzwmzHmmYOaFWSQBq4V2EEXny6sSVxo-F7d6EEut1Iq3ltGvqb8Dad0mvSnS7EBt83_cxM2TtTNTkt8vyrtiEmpFPlpTn6WoiTm-RQgERBm9e-9E=s1064-w1064-h400-n",
		description: "Mystery Bay is a small town on the south coast of New South Wales, Australia. Mystery Bay is halfway between Central Tilba and Narooma, two kilometres off the Princes Highway on Mystery Bay Road. At the 2011 census, Mystery Bay had a population of 248 people. Mystery Bay features a camping area in the Eurobodalla National Park. Mystery Bay holds many different types of beaches that front the Tasman Sea. Some beaches are surfing beaches, others are swimming beaches, and a lot of these beaches contain spectacular large rocks. At low tide, these rocks become rock pools. The bay itself is the location where the abandoned wreck of a small boat was discovered in mysterious circumstances in 1880. The boat had carried Lamont Young, a government geologist inspecting new goldfields on behalf the New South Wales Mines Department together with his assistant Max Schneider, and boat owner Thomas Towers and two others, from nearby Bermagui."
	},
	{
		name: "Wombeyan Caves",
		image: "https://lh3.googleusercontent.com/proxy/oDCygeaSFU6ttkI65hDjWE6vRwSFLEEf0LNXwRKFRXF41GOuTAp3eLxgPse7cxD4ZUb60BE70q41xI4-nfOxnh1GMW4XZBXdhAIvY7jR2Z08gps_1ViXylgiB2acmmGSXgjOybApgjXfKCw=s1064-w1064-h400-n",
		description: "The Wombeyan Caves are caves that have formed in marble, in the Wombeyan Karst Conservation Reserve, New South Wales, Australia. Wombeyan Caves is a tourist attraction and local holiday area, as well as a reserve for endangered species, such as several species of wallaby, bird, possum, and wombat."
	},
	{
		name: "Kangaroo Valley",
		image: "https://lh6.googleusercontent.com/proxy/p6524H41Aj3KYO0qD3iwdkgVKvbHzFalXmPgVrQ1F-hEWx63pGIMCEpo_chtC-EyKvxs9vbp8YfNSGd1PAvRPVRPNUFAyyCzUAdxcDux32ktCkzUhMHXWYGCwtUjgUmb-OjXvryH0hRAiE0=s1064-w1064-h400-n",
		description: "Kangaroo Valley is a river valley along the Kangaroo River in the Shoalhaven region of New South Wales, Australia, located west of the seaside in the City of Shoalhaven. It is also the name of the small township within it, formerly known as Osborne, with a population of 844 in the 2011 census. The township is accessed by the Moss Vale Road, which links Moss Vale to the Princes Highway at Bomaderry a little north of Nowra."
	}
]

function seedDB() {
	// remove all campgrounds
	Campground.remove({}, function(err) {
		// if(err) {
		// 	console.log(err);
		// } else {
		// 	// add a few campgrounds
		// 	data.forEach(function(seed) {
		// 		Campground.create(seed, function(err, campground) {
		// 			if(err) {
		// 				console.log(err);
		// 			} else {
		// 				Comment.remove({}, function(err) {
		// 					if(err) {
		// 						console.log(err);
		// 					} else {
		// 						// add a comment
		// 						Comment.create(
		// 							{
		// 								text: "This place is great.",
		// 								author: "Homer Simpson"
		// 							}, function(err, comment) {
		// 								if(err) {
		// 									console.log(err);
		// 								} else {
		// 									campground.comments.push(comment);
		// 									campground.save();
		// 								}
		// 							}
		// 						);
		// 					}
		// 				});
		// 			}
		// 		});
		// 	});
		// 	console.log("Removed all campgrounds.");
		// 	console.log("Added some dummy campgrounds.");
		// 	console.log("Removed all comments.");
		// 	console.log("Added some dummy comments.");
		// }
	});
};

module.exports = seedDB;
