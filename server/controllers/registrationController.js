/**
 * last updated: Dec 20 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This Server works for registering user
 * Map: (Client) Register -> (Server) server -> registerController
 */
'use strict';
let crypto = require('crypto');
const express = require('express');
const router = express.Router();
const Register_user = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async function (req, res) {
	console.log(req.body)
	const userID = req.body.userID;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const saltRounds = 10;
	let password;

	await bcrypt
		.genSalt(saltRounds)
		.then(salt => {
			console.log(`Salt: ${salt}`);

			return bcrypt.hash(req.body.password, salt);
		})
		.then(hash => {
			console.log(`Hash: ${hash}`);
			password = hash;

		})
		.catch(err => console.error(err.message));
	Register_user.user_mywebsite.create({
		userID: userID,
		password: (String)(password),
		firstName: firstName,
		lastName: lastName,
		email: email
	})
		.then(() => {
			res.json('Registration success');
		})
		.catch(err => {
			res.json(err);
		});

});

module.exports = router;