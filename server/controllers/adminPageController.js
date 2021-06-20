/**
 * last updated: Apr 3 2021
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * Get all user list and then send to an admin page
 * Map: (Client) AdminPage -> (Server) server -> adminPageController
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
	const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
	const DELETE_USER_ADMIN = 'DELETE_USER_ADMIN';
	const GET_ALL_USERS_ADMIN = 'GET_ALL_USERS_ADMIN';
	let passwordIsValid;
	const type = req.body.type;

	if (type == DELETE_USER_ADMIN) {
		const user = req.body.user_info;
		login_user.user_mywebsite.destroy({
			where: {
				userID: user.userID
			},
			include: {
				model: login_user.role_mywebsite
			}
		})
			.then(() => {
				if (user.profile_img_path != null) {
					fs.unlink(user.profile_img_path, function (err) {
						if (err) throw err;
					})
				}
				return res.send({
					message: DELETE_ACCOUNT_SUCCESS,
				});
			})
	}

	login_user.user_mywebsite.findAll({
		include: {
			model: login_user.role_mywebsite
		}
	})
		.then(async users => {
			if (!users) {
				return res.send({ message: USER_NOT_FOUND });
			}
			if (users) {
				return res.send({
					message: GET_USERS_SUCCESS,
					users: users
				});

			}
			else {
				return res.status(400).send({
					message: WRONG_PASSWORD,
					accessToken: null
				});
			}
		});
})
module.exports = router;