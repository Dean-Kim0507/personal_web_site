const db = require("../models");
const User = db.user_mywebsite;

checkDuplicateUsernameOrEmail = (req, res, next) => {
	let userID_err = false;
	let email_err = false;
	// UserID
	User.findOne({
		where: {
			userID: req.body.userID
		}
	}).then(user => {
		if (user) {
			userID_err = true;
		}

		// Email
		User.findOne({
			where: {
				email: req.body.email
			}
		}).then(user => {
			if (user) {
				email_err = true;
			}
			if (userID_err && email_err) {
				res.send("userID, email duplication");
				return;
			}
			else if (userID_err) {
				res.send("userID duplication");
				return;
			}
			else if (email_err) {
				res.send("email duplication");
				return;
			}

			next();
		});
	});
};
const verifySignUp = {
	checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;