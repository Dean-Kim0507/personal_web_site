/**
 * last updated: Mar 22 2021
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * If user forget password, by receiving valid token, user can update their password.
 * Map: (Client) ResetAccount -> (Server) server -> (Middleware) verifyResetPasswordToken.verifyToken -> resetPasswordController.js)
 */

'use strict';
const express = require('express');
const router = express.Router();
const db = require('../models');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

router.post('/', async function (req, res) {
	const TOKEN_VALIDATE = 'TOKEN_VALIDATE';
	const RESET_PASSWORD = 'RESET_PASSWORD';
	const RESET_PASSWORD_VERIFY_TOKEN = 'RESET_PASSWORD_VERIFY_TOKEN';
	const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
	const TOKEN_NOTFOUND = 'TOKEN_NOTFOUND';
	const saltRounds = 10;
	let password;

	/* If user click URL on their email, middleware(verifyResetPasswordToken.js) check validity and then 
	send the message 'RESET_PASSWORD_VERIFY_TOKEN' to the client.*/
	if (req.body.type === RESET_PASSWORD_VERIFY_TOKEN) {
		res.send({ message: TOKEN_VALIDATE });
	}
	//Implementing When user request updating password.
	else if (req.body.type === RESET_PASSWORD) {
		const email = req.body.email;
		const token = req.body.token;
		db.emailAuth.findOne({
			where: {
				token: token
			}
		}).then((result) => {
			if (result != null) {
				db.user_mywebsite.findOne({
					where: {
						userID: result.userID
					}
				})
					.then(async user => {
						if (!user) {
							return res.status(400).send({ message: USER_NOT_FOUND });
						}
						await bcrypt
							.genSalt(saltRounds)
							.then(salt => {
								return bcrypt.hash(req.body.password, salt);
							})
							.then(hash => {
								password = hash;
							})
							.catch(err => res.status(400).send(err.message));
						await db.user_mywebsite.update({
							password: (String)(password)
						}, { where: { userID: user.userID } })
							.then(() => {
								res.send({ message: RESET_PASSWORD_SUCCESS })
							})
					});
			}
			else {
				res.send({ message: TOKEN_NOTFOUND });
				return
			}
		})
	}
})

module.exports = router;