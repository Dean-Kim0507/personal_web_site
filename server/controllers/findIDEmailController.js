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


router.post('/', async function (req, res) {
	const userID = req.body.userID;
	const email = req.body.email;
	const type = req.body.type;
	const FIND_ID = 'FIND_ID';
	const FIND_PASSWORD = 'FIND_PASSWORD';
	const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
	const SEND_EMAIL_FAIL = 'SEND_EMAIL_FAIL';

	if (type === FIND_PASSWORD) {
		db.user_mywebsite.findOne({
			where: { email: email },
		})
			.then(async (user) => {
				if (user) {
					const token = crypto.randomBytes(20).toString('hex');
					const data = {
						token: token,
						userID: user.userID,
						ttl: 300, // Time Limit (5 Minutes)
					};
					await db.emailAuth.create(data); // 5. 인증 코드 테이블에 데이터 입력

					const transporter = nodemailer.createTransport({
						service: 'gmail',
						port: 465,
						secure: true, // true for 465, false for other ports
						auth: emainConfig.emailInfo,
					});

					const mailOptions = {
						from: emainConfig.emailInfo.user, // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
						to: user.email, // 수신 메일 주소
						subject: 'Password search authentication code transmission', // 제목
						text: 'This is the authentication code to find the password!', // 내용
						html:
							`<p>Please click the URL to reset password.<p>` +
							`<a href='${process.env.DOMAIN}${token}/${email}'>Reset Your Password</a>`,
					};

					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							console.log(error);
						} else {
							console.log('Email sent: ' + info.response);
						}
					});
					return res.json({ message: SEND_EMAIL_SUCCESS });
				} else {
					return res.status(403).send({ message: SEND_EMAIL_SUCCESS });
				}
			})
	}
	else if (type === FIND_ID) {
		db.user_mywebsite.findOne({
			where: { email: email },
		})
			.then(async (user) => {
				if (user) {
					const transporter = nodemailer.createTransport({
						service: 'gmail',
						port: 465,
						secure: true, // true for 465, false for other ports
						auth: emainConfig.emailInfo
					});

					const mailOptions = {
						from: emainConfig.emailInfo.user, // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
						to: user.email, // 수신 메일 주소
						subject: `Your User ID is...`, // 제목
						text: 'This is your User ID', // 내용
						html:
							`<p>This is your User ID<p>` +
							`<p>User ID: ${user.userID}<p>` +
							`<a href='${process.env.DOMAIN}login'>Go to Login Page</a>`,
					};

					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							console.log(error);
						} else {
							console.log('Email sent: ' + info.response);
						}
					});
					return res.json({ message: SEND_EMAIL_SUCCESS });
				} else {
					return res.status(403).send({ message: SEND_EMAIL_SUCCESS });
				}
			})
	}
})
module.exports = router;