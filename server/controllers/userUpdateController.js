/**
 * last updated: Jan 7 2021
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This Server works for updating user
 * Map: (Client) MyAccount ->(Middle ware) authJwt -> (Server) server -> userUpdateController
 */
'use strict';
// let crypto = require('crypto');
const express = require('express');
const router = express.Router();
const Register_user = require('../models');
const { user } = require('../mysql');
let jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const fs = require('fs');

router.post('/', async function (req, res) {

	const userID = req.body.userID;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const profileImg = req.files;
	let profileImgName;
	const saltRounds = 10;
	let password;
	let imagePath;

	// if user didn't change profile image, get the old path from database
	await Register_user.user_mywebsite.findOne(
		{ where: { userID: userID } })
		.then(user => {
			imagePath = user.profile_img_path;
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ message: err.message });
		});
	console.log(profileImg)
	if (profileImg != null) {
		fs.unlink(imagePath, function (err) {
			if (err) throw err;
		})
		if (profileImg.imgFile.name.indexOf(' ') != -1) {
			profileImgName = profileImg.imgFile.name.replace(/ /g, '');
		}
		else profileImgName = profileImg.imgFile.name;
		imagePath = '../Client/public/uploadImages/profileImg/' + userID + "profileImg" + Date.now() + profileImgName;
		profileImg.imgFile.mv(imagePath
			, function (err) {
				if (err) return res.status(500).send(err);
			}
		);
	}

	console.log(imagePath)

	await Register_user.user_mywebsite.update({
		firstName: firstName,
		lastName: lastName,
		email: email,
		profile_img_path: imagePath

	}, { where: { userID: userID } })

		.then(async () => {
			await Register_user.user_mywebsite.findOne(
				{ where: { userID: userID } })
				.then(user => {
					//algorithm: (default) HS256 
					let token = jwt.sign({ id: user.userID }, config.secret, {
						expiresIn: 60 * 60 * 24 // 24 hours
					});
					return res.send({
						userID: user.userID,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						profileImg: user.profile_img_path,
						createdAt: user.createdAt,
						upatedAt: user.upatedAt,
						message: "Update success.",
						accessToken: token
					});
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({ message: err.message });
				});
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ message: err.message });
		});
});

module.exports = router;