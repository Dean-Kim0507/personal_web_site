var express = require('express');
const { Router } = require('express');
const router = express.Router();
var mysql = require('mysql');
const dbconfig = require('../../mysql.js');
const connection = mysql.createConnection(dbconfig);
const db = require('../../models');

router.post('/', async (req, res) => {
	const table = req.body.type;
	const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
	if (table === 'communitypost') {
		await db.post_community.findAll()
			.then((data) => {
				console.log(data)
				res.json({
					data: data,
					message: CREATE_POST_SUCCESS
				});
			})
	}
	else await db.post_feedback.findAll()
		.then((data) => {
			console.log(data)
			res.json({
				data: data,
				message: CREATE_POST_SUCCESS
			});
		})

	// connection.query(`SELECT id, writer, title, description, DATE_FORMAT(created, '%m-%d-%Y') AS 'date', DATE_FORMAT(created, '%H:%i') AS 'time' FROM ${table};`, (err, rows) => {
	// 	if(err) throw err;	
	// 	res.send({rows});
	// 	// console.log(res.send({rows}));
	// });
});

module.exports = router;