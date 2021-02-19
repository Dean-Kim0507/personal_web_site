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
	console.log(req.body.token)
	await db.emailauth.findOne({
		where: {
			token:
				req.body.token
			// ,
			// created: {
			// 	greater: new Date.now() - ttl
			// }
		}
	}).then((result) => {
		console.log(result);
	})
	// .then((Auth) => { // 유저데이터 호출
	// 	User.find(...)
	// }).then(user) => { // 유저 비밀번호 업데이트
	// 	User.update(...)
	// }
})
module.exports = router;