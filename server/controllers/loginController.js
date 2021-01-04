/**
 * last updated: Dec 21 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * Get user id and password from client and authenticate user
 * Map: (Client) Login -> (Server) server -> loginController
 */

'use strict';
const express = require('express');
const router = express.Router();
const login_user = require('../models');
const bcrypt = require('bcrypt');
const config = require("../config/auth.config");
let jwt = require("jsonwebtoken");
const { useRouteMatch } = require('react-router');

router.post('/', async function (req, res) {
	let passwordIsValid;
	login_user.user_mywebsite.findOne({
		where: {
			userID: req.body.userID
		}
	})
		.then(async user => {
			if (!user) {
				return res.send({ message: "User Not found." });
			}
			await bcrypt.compare(req.body.password, user.password, function (err, result) {
				if (result) {
					//algorithm: (default) HS256 
					let token = jwt.sign({ id: user.userID }, config.secret, {
						expiresIn: 60 * 60 * 24 // 24 hours
					});
					console.log(token);
					return res.send({
						userID: user.userID,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						profileImg: user.profile_img_path,
						createdAt: user.createdAt,
						upatedAt: user.upatedAt,
						message: "Login Success.",
						accessToken: token
					});
				}
				else {
					return res.send({
						message: "Wrong password.",
						accessToken: null
					});
				}
			});

		});
})
module.exports = router;