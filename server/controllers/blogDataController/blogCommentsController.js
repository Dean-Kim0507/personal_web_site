/**
 * last updated: Dec 2 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This Server works for storing Comments
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
	let comment = req.body.body;
	console.log('id: ', id, 'comment: ', comment);

	await Blogdata.blogcomments.create({
		blog_id: id,
		blog_comment: comment
	})
		.then(result => {
			console.log(result);
			res.json('Upload success');
		})
		.catch(err => {
			res.json(err);
		});
});

module.exports = router;