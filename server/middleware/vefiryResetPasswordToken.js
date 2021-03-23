const db = require("../models");
const User = db.user_mywebsite;

verifyToken = (req, res, next) => {
	const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
	const TOKEN_NOTFOUND = 'TOKEN_NOTFOUND';
	console.log(req.body.token)
	const token = req.body.token;
	if (token != null) {
		db.emailAuth.findOne({
			where: {
				token: token
			}
		}).then((result) => {
			if (result != null) {
				if (5000000 > (new Date() - result.createdAt) / 1000) {
					next();
				}
				else {
					res.send({ message: TOKEN_EXPIRED });
					return;
				}
			}
			else {
				res.send({ message: TOKEN_NOTFOUND });
				return
			}
		})
	}
}
const verifyResetPasswordToken = {
	verifyToken: verifyToken
};

module.exports = verifyResetPasswordToken;