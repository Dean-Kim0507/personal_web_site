const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../../mysql.js');
const { Router } = require('express');
const connection = mysql.createConnection(dbconfig);
const db = require('../../models');

router.post('/', async (req, res) => {
	const id = parseInt(req.body.id);
	const mode = req.body.mode;
	const writer = req.body.writer;
	const title = req.body.title;
	const desc = req.body.description;
	const table = req.body.type;
	const query2 = `SELECT id, writer, title, description, DATE_FORMAT(created, '%m-%d-%Y') AS 'date', DATE_FORMAT(created, '%H:%i') AS 'time' FROM ${table};`;
	const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
	let _query1, query1, param1;

	console.log(req.body)
	if (mode === 'create') {

		if (table === 'communitypost') {
			await db.post_community.create({
				id: id,
				writer: writer,
				title: title,
				desc: desc
			})
				.then(() => {
					res.json({ message: CREATE_POST_SUCCESS });
				})
		} else {
			await db.post_feedback.create({
				id: id,
				writer: writer,
				title: title,
				desc: desc
			})
				.then(() => {
					res.json({ message: CREATE_POST_SUCCESS });
				})
		}
	}

	else if (mode === 'delete') {
		_query1 = "DELETE FROM " + table + " WHERE id=?;";
		param1 = id;
		query1 = mysql.format(_query1, param1);
	}

	else if (mode === 'update') {
		_query1 = "UPDATE " + table + " SET writer=?, title=?, description=?, created= SYSDATE() WHERE id=?;";
		param1 = [writer, title, description, id];
		query1 = mysql.format(_query1, param1);
	}

	connection.query(query1 + query2, (err, rows, fields) => {
		console.log(rows);
		if (err) throw err;

		res.send({ rows });
	});

	// if(err) throw err;
});


module.exports = router;