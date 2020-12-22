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
	let blog_id = Number.parseInt(req.body.blog_id);
	let mode = req.body.commentMode;
	let comment = req.body.body;
	console.log(mode);
	if (mode === 'create') {
		await Blogdata.blogcomments.create({
			blog_id: blog_id,
			blog_comment: comment
		})
			.then(result => {
				// console.log(result);
				console.log('Upload success');
			})
			.catch(err => {
				res.json(err);
			});
	}

	else if (mode === 'delete') {
		await Blogdata.blogcomments.destroy({
			where: {
				id: id
			}
		})
			.then(result => {
				console.log('Delete success');
			})

			.catch(err => {
				res.json(err);
			})
	}

	Blogdata.blogcomments.findAll({
		where: { blog_id: blog_id }
	})
		.then(results => {
			// console.log('results: ', results);
			res.send(results);
		})
});

module.exports = router;