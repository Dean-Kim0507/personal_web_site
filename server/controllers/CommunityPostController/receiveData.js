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
	const desc = req.body.desc;
	const table = req.body.type;
	const query2 = `SELECT id, writer, title, description, DATE_FORMAT(created, '%m-%d-%Y') AS 'date', DATE_FORMAT(created, '%H:%i') AS 'time' FROM ${table};`;
	const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
	const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
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
				.catch((err) => {
					res.json(err);
				})
		} else {
			await db.post_feedback.create({
				id: id,
				writer: writer,
				title: title,
				desc: desc
			})
				.catch((err) => {
					res.json(err);
				})
		}
	}

	else if (mode === 'delete') {
		if (table === 'communitypost') {
			await db.post_community.destroy({
				where: {
					id: id
				}
			})
				.catch(err => {
					res.json(err);
				})
		}
		else {
			await db.post_feedback.destroy({
				where: {
					id: id
				}
			})
				.catch(err => {
					res.json(err);
				})
		}
	}

	else if (mode === 'update') {
		if (table === 'communitypost') {
			await db.post_community.update({
				writer: writer,
				title: title,
				desc: desc
			}, {
				where: { id: id }
			})
				.catch(err => {
					res.json(err);
				})
		}
		else {
			await db.post_feedback.update({
				writer: writer,
				title: title,
				desc: desc
			}, {
				where: { id: id }
			})
				.catch(err => {
					res.json(err);
				})
		}
	}
	if (table === 'communitypost') {
		db.post_community.findAll()
			.then((data) => {
				res.json({
					data: data,
				});
			})
	}
	else {
		db.post_feedback.findAll()
			.then((data) => {
				console.log(data)
				res.json({
					data: data,
				});
			})
	}
	// _query1 = "DELETE FROM " + table + " WHERE id=?;";
	// param1 = id;
	// query1 = mysql.format(_query1, param1);



	// connection.query(query1 + query2, (err, rows, fields) => {
	// 	console.log(rows);
	// 	if (err) throw err;

	// 	res.send({ rows });
	// });

	// if(err) throw err;
});


module.exports = router;