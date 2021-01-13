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

router.post('/', async function (req, res) {
	const USER_NOT_FOUND = 'USER_NOT_FOUND';
	const WRONG_PASSWORD = 'WRONG_PASSWORD';
	const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
	let passwordIsValid;
	login_user.user_mywebsite.findOne({
		where: {
			userID: req.body.userID
		}
	})
		.then(async user => {
			if (!user) {
				return res.status(400).send({ message: USER_NOT_FOUND });
			}
			await bcrypt.compare(req.body.password, user.password, function (err, result) {
				if (result) {
					//algorithm: (default) HS256 
					let token = jwt.sign({ id: user.userID }, config.secret, {
						expiresIn: 5
						// 60 * 60 * 24 // 24 hours
					});
					return res.send({
						userID: user.userID,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						profileImg: user.profile_img_path,
						createdAt: user.createdAt,
						upatedAt: user.upatedAt,
						message: LOGIN_SUCCESS,
						accessToken: token
					});
				}
				else {
					return res.status(400).send({
						message: WRONG_PASSWORD,
						accessToken: null
					});
				}
			});

		});
})
module.exports = router;