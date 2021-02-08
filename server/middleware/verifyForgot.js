const db = require("../models");
const User = db.user_mywebsite;

findUserIDEmail = (req, res, next) => {
	const FIND_ID = 'FIND_ID';
	const FIND_PASSWORD = "FIND_PASSWORD";
	const NOT_FOUND_ID = 'NOT_FOUND_ID';
	const NOT_FOUND_EMAIL = 'NOT_FOUND_EMAIL';
	const NOT_FOUND_ID_EMAIL = 'NOT_FOUND_ID_EMAIL';
	let userID_err = false;
	let email_err = false;
	// UserID
	if (req.body.type === FIND_PASSWORD) {
		User.findOne({
			where: {
				userID: req.body.userID,
				email: req.body.email
			}
		}).then(user => {
			if (!user) {
				email_err = true;
				userID_err = true;
			}
			if (userID_err && email_err) {
				res.send({ message: NOT_FOUND_ID_EMAIL });
				return;
			}
			next();
		});
	}

	// Email
	if (req.body.type === FIND_ID) {
		User.findOne({
			where: {
				email: req.body.email
			}
		}).then(user => {
			if (!user) {
				email_err = true;
			}
			if (email_err) {
				res.send({ message: NOT_FOUND_EMAIL });
				return;
			}
			next();
		});
	};
}

const verifyForgot = {
	findUserIDEmail: findUserIDEmail
};

module.exports = verifyForgot;