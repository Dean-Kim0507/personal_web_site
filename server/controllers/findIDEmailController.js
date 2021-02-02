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


router.post('/', async function (req, res) {
	const userID = req.body.userID;
	const email = req.body.email;
	const type = req.body.type;
	const FIND_ID = 'FIND_ID';

	const user = db.user_mywebsite.findOne({
		where: { email: email },
	});
	if (user) {
		const token = crypto.randomBytes(20).toString('hex');
		const data = {
			token: token,
			userid: user.userID,
			ttl: 300, // Time Limit (5 Minutes)
		};
		db.emailAuth.create(data); // 5. 인증 코드 테이블에 데이터 입력

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				// 이메일을 보낼 계정 데이터 입력
				user: 'dean.kim.donghyun@gmail.com',
				pass: '1Q2w3e4r!!@',
				// .env에 따로 관리해야함
			},
		});

		const mailOptions = {
			from: 'dean.kim.donghyun@gmail.com', // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
			to: 'poolup000@gmail.com', // 수신 메일 주소
			subject: 'Password search authentication code transmission', // 제목
			text: 'This is the authentication code to find the password!', // 내용
			html:
				`<p>Please click the URL to reset password.<p>` +
				`<a href='http://localhost:2030/resetaccount/${token}'>비밀번호 새로 입력하기</a>`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
		return res.json(result);
	} else {
		return res.status(403).send('This account does not exist');
	}
})
module.exports = router;