/**
 * last updated: Nov 30 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This Server works for delete the data
 *
 * Map: server -> blogCreateController
 * (Storing to Database) HTTP: CreateBlogList (Client) --> blogCreateController (server)
 * (Retrieving from Database) HTTP: ReadBlogList (server) --> BlogList.js (Client)
 * (Update Information) HTTP: UpdateBlogList (Client) --> blogUpdateController.js (server)
 * (Delete Data) UpdateBlogList (Client) --> blogUpdateController.js (server)
 */

const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());
const Blogdata = require('../../models');
const fs = require('fs');

router.post('/', async function (req, res) {

	let id = Number.parseInt(req.body.id);
	let writer = req.body.writer;

	await Blogdata.blogDataAdmin.findOne({
		where: {
			blog_id: id
		}
	})
		.then(data => {
			let imagePath = data.imagespath;
			splittedImagePaths = [];
			if (imagePath != null) {
				if (imagePath.indexOf(',') != -1) {
					splittedImagePaths = imagePath.split(',');
					for (let a = 0; a < splittedImagePaths.length; a++) {
						fs.unlink(splittedImagePaths[a], function (err) {
							if (err) throw err;
						})
					}
				}
				else {
					fs.unlink(imagePath, function (err) {
						if (err) throw err;
					})
				}
			}
		})

		.catch(err => {
			res.json(err);
		})

	await Blogdata.blogDataAdmin.destroy({
		where: {
			blog_id: id
		}
	})
		.then(result => {
			console.log('blogData Delete success');
		})

		.catch(err => {
			res.json(err);
		})

	await Blogdata.blogcomments.destroy({
		where: {
			blog_id: id
		}
	})
		.then(result => {
			console.log('Commenta Delete success');
			res.json('Delete success')
		})

		.catch(err => {
			res.json(err);
		})

})
module.exports = router;