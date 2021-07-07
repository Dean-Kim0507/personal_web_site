/**
 * last updated: Feb 1 2021
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * Retrieve user ID and email and return 
 * Map: (Client) Login -> (Server) server -> loginController
 */

'use strict';
const express = require('express');
const router = express.Router();
const db = require('../models');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const emainConfig = require('../config/emai.config')
const { google } = require('googleapis')
const { forgotPW, forgotID } = require('../form/emai.form')


router.post('/', async function (req, res) {
	const userID = req.body.userID;
	const email = req.body.email;
	const type = req.body.type;
	const FIND_ID = 'FIND_ID';
	const FIND_PASSWORD = 'FIND_PASSWORD';
	const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
	const SEND_EMAIL_FAIL = 'SEND_EMAIL_FAIL';
	let mailOptions;

	db.user_mywebsite.findOne({
		where: { email: email },
	})
		.then(async (user) => {
			if (user) {
				//if email exists, request refreshToken to access google OAuth  

				const oAuth2Client = new google.auth.OAuth2(process.env.FORGOT_EMAIL_CLIENT_ID, process.env.FORGOT_EMAIL_SECRET, process.env.FORGOT_REDIRECT_URI)
				oAuth2Client.setCredentials({ refresh_token: process.env.FORGOT_EMAIL_REFRESH_TOKEN })

				// Generate Token to access the reset password PAGE
				const token = crypto.randomBytes(20).toString('hex');
				const data = {
					token: token,
					userID: user.userID,
					ttl: 300, // Time Limit (5 Minutes)
				};
				await db.emailAuth.create(data); // 5. 인증 코드 테이블에 데이터 입력

				//send mail
				async function sendMail() {
					try {
						//generate access token from google
						const accessToken = await oAuth2Client.getAccessToken();
						const transporter = nodemailer.createTransport({
							service: 'gmail',
							port: 465,
							secure: true, // true for 465, false for other ports
							auth: {
								type: "OAuth2",
								user: process.env.FORGOT_EMAIL_ID,
								clientId: process.env.FORGOT_EMAIL_CLIENT_ID,
								clientSecret: process.env.FORGOT_EMAIL_SECRET,
								refreshToken: process.env.FORGOT_EMAIL_REFRESH_TOKEN,
								accessToken: accessToken
							}
						});
						//Main contents
						if (type === FIND_PASSWORD) {
							mailOptions = forgotPW(user.firstName, token, user.email);
						}
						else if (type === FIND_ID) {
							mailOptions = forgotID(user.userID, user.email);
						}
						const result = transporter.sendMail(mailOptions);
						return result;
					} catch {
						res.status(403).send({ message: SEND_EMAIL_FAIL });
					}
				}
				//Executution
				sendMail()
					.then(result => {
						if (result) {
							return res.json({ message: SEND_EMAIL_SUCCESS });
						}
						else res.status(403).send({ message: SEND_EMAIL_FAIL });
					})

			} else {
				return res.status(403).send({ message: SEND_EMAIL_FAIL });
			}
		})
})
module.exports = router;