const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user_mywebsite;

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({
			message: "NO_TOKEN_PROVIDED"
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "UNAUTHORIZED"
			});
		}
		req.userID = decoded.id;
		console.log(req.userID)
		next();
	});
};

isAdmin = (req, res, next) => {
	console.log();
	if (req.body.admin_info.role === 1) {
		next();
		return;
	}
	res.status(403).send({
		message: "Require Admin Role!"
	});
	return;
};



const authJwt = {
	verifyToken: verifyToken,
	isAdmin: isAdmin
};
module.exports = authJwt;