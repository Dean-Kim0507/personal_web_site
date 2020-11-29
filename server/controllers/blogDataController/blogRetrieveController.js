/**
 * last updated: Nov 26 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This Server works for storing blog data.
 * This server get the images and information from createBlogList.js and save to the uploadeImages folder in public in Client, and then
 * other text information and IMAGES' PATH store to database.
 *
 * Map: server -> blogCreateController
 * (Storing to Database) HTTP: CreateBlogList (Client) --> blogCreateController (server)
 * (Retrieving from Database) HTTP: ReadBlogList (server) --> BlogList.js (Client)
 * (Update Information) HTTP: UpdateBlogList (Client) --> blogUpdateController.js (server)
 */

const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());
const Blogdata = require('../../models');

router.post('/', async function (req, res) {

	let id = Number.parseInt(req.body.id);
	let writer = req.body.writer;

	Blogdata.blogDataAdmin.findOne({
		where: {
			id: id
		}
	})
		.then(results => {
			res.send(results);
		})

		.catch(err => {
			res.json(err);
		})

})
module.exports = router;