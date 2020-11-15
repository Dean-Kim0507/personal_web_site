var express = require('express');
const { Router } = require('express');
const router = express.Router();
var mysql = require('mysql');
const dbconfig   = require('../../mysql.js');
const connection = mysql.createConnection(dbconfig);

router.post('/',function (req, res){
	const table = req.body.type;
	connection.query(`SELECT id, writer, title, description, DATE_FORMAT(created, '%m-%d-%Y') AS 'date', DATE_FORMAT(created, '%H:%i') AS 'time' FROM ${table};`, (err, rows) => {
		if(err) throw err;	
		res.send({rows});
		// console.log(res.send({rows}));
	});
});

module.exports = router;