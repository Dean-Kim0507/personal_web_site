/**
 * last updated: Dec 20 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This Server works for registering user
 * Map: (Client) Register -> (Server) server -> registerController
 */
'use strict';
// let crypto = require('crypto');
const express = require('express');
const router = express.Router();
const Register_user = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async function (req, res) {
	const userID = req.body.userID;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	const saltRounds = 10;
	let password;
	let imagePath;


	// hasing and salting password
	await bcrypt
		.genSalt(saltRounds)
		.then(salt => {
			return bcrypt.hash(req.body.password, salt);
		})
		.then(hash => {
			password = hash;
		})
		.catch(err => console.error(err.message));

	await Register_user.user_mywebsite.create({
		userID: userID,
		password: (String)(password),
		firstName: firstName,
		lastName: lastName,
		email: email,
		profile_img_path: imagePath

	})
		.then(res => {
			Register_user.user_mywebsite_role_mywebsite.create({
				userID: userID,
				roleID: 2
			})
		})
		.then(() => {
			res.json({ message: 'Registration success' });
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ message: err.message });
		});

});

module.exports = router;