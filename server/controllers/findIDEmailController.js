/**
 * last updated: Dec 21 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * Get user id and password from client and authenticate user
 * Map: (Client) Login -> (Server) server -> loginController
 */

'use strict';
const express = require('express');
const router = express.Router();


router.post('/', async function (req, res) {
	const userID = req.body.userID;
	const email = req.body.email;
	const type = req.body.type;


})
module.exports = router;