/**
 * last updated: Jan 7 2021
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This Server is for updating user information (user personal information, reset password, disable user account)
 * Function depend on 'req.body.type'
 * type = 'USER_UPDATE' -> user personal information update
 * type = 'RESET_PASSWORD -> reset password
 * 
 * Map: (Client) MyAccount ->(Middle ware) authJwt -> (Server) server -> userUpdateController
 */
'use strict';
// let crypto = require('crypto');
const express = require('express');
const router = express.Router();
const db = require('../models');
let jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const bcrypt = require('bcrypt');
const fs = require('fs');
const { upload, deleteImg } = require('../middleware/multer');

router.post('/', upload.single('images'), async function (req, res) {
	const userID = req.body.userID;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const type = req.body.type;
	const profileImg = req.file;
	const USER_UPDATE = 'USER_UPDATE';
	const RESET_PASSWORD = 'RESET_PASSWORD';
	const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
	const WRONG_PASSWORD = 'WRONG_PASSWORD';
	const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
	const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
	const USER_DELETE_WRONG_PASSWORD = 'USER_DELETE_WRONG_PASSWORD';

	const saltRounds = 10;
	let password;
	let imagePath;

	if (type === USER_UPDATE) {
		// if user didn't change profile image, get the old path from database
		await db.user_mywebsite.findOne(
			{ where: { userID: userID } })
			.then(user => {
				imagePath = user.profile_img_path;
			})
			.catch(err => {
				return res.status(500).json({ message: err.message });
			});

		//If there is a image and user want to change it.
		if (profileImg != null && imagePath != null) {
			req.body = {
				delimg: imagePath,
				mode: 'delete'
			}
			deleteImg(req)
			imagePath = profileImg.location
		}
		//If there is no inage and user want to add it.
		else if (profileImg != null && imagePath == null) {
			imagePath = profileImg.location;
		}

		await db.user_mywebsite.update({
			firstName: firstName,
			lastName: lastName,
			email: email,
			profile_img_path: imagePath

		}, { where: { userID: userID } })
			.then(async () => {
				await db.user_mywebsite.findOne(
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
							message: USER_UPDATE_SUCCESS,
							accessToken: token
						});
					})
					.catch(err => {
						res.status(500).json({ message: err.message });
					});
			})
			.catch(err => {
				res.status(500).json({ message: err.message });
			});
	}
	// Reset Password
	else if (type == RESET_PASSWORD) {
		db.user_mywebsite.findOne({
			where: {
				userID: userID
			}
		})
			.then(async user => {
				if (!user) {
					return res.status(400).send({ message: USER_NOT_FOUND });
				}
				await bcrypt.compare(req.body.currentPassword, user.password, async function (err, result) {
					if (result) {
						await bcrypt
							.genSalt(saltRounds)
							.then(salt => {
								return bcrypt.hash(req.body.newPassword, salt);
							})
							.then(hash => {
								password = hash;
							})
							.catch(err => res.status(400).send(err.message));
						await db.user_mywebsite.update({
							password: (String)(password)
						}, { where: { userID: userID } })
							.then(() => {
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
									message: USER_UPDATE_SUCCESS,
									accessToken: token
								});
							})
					}
					else {
						return res.status(400).send({
							message: WRONG_PASSWORD
						});
					}
				});

			});
	}

	else if (type == DELETE_ACCOUNT) {
		db.user_mywebsite.findOne({
			where: {
				userID: userID
			}
		})
			.then(async user => {
				if (!user) {
					return res.status(400).send({ message: USER_NOT_FOUND });
				}
				await bcrypt.compare(req.body.password, user.password, async function (err, result) {
					if (result) {
						db.user_mywebsite.destroy({
							where: {
								userID: userID
							}
						})
							.then(async () => {
								db.user_mywebsite_role_mywebsite.destroy({
									where: {
										userID: userID
									}
								})
									.then(() => {
										if (user.profile_img_path != null) {
											req.body = {
												delimg: user.profile_img_path,
												mode: 'delete'
											}
											deleteImg(req);
										}
										return res.send({
											message: DELETE_ACCOUNT_SUCCESS,
										});
									})
									.catch((error) => {
										return res.status(400).send({
											message: error.message
										});
									})
							})
					}
					else {
						return res.status(400).send({
							message: USER_DELETE_WRONG_PASSWORD
						});
					}
				})
			})
	}

});


module.exports = router;