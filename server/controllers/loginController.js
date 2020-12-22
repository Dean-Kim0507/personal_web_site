/**
 * last updated: Dec 21 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * Get user id and password from client and authenticate user
 * Map: (Client) Login -> (Server) server -> loginController
 */

'use strict';
let crypto = require('crypto');
const express = require('express');
const router = express.Router();
const login_user = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async function (req, res) {

});

module.exports = router;