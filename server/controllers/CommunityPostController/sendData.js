var express = require('express');
const { Router } = require('express');
const router = express.Router();
var mysql = require('mysql');
const dbconfig = require('../../config/config');
const connection = mysql.createConnection(dbconfig);
const db = require('../../models');

router.post('/', async (req, res) => {
	const table = req.body.type;
	const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
	if (table === 'communitypost') {
		await db.post_community.findAll()
			.then((data) => {
				res.json({
					data: data,
					message: CREATE_POST_SUCCESS
				});
			})
	}
	else await db.post_feedback.findAll()
		.then((data) => {
			res.json({
				data: data,
				message: CREATE_POST_SUCCESS
			});
		})

});

module.exports = router;