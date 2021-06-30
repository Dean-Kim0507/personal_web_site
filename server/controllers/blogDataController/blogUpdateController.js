/**
 * last updated: Nov 28 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This Server works for updating blog data
 *
 * Map: server -> blogUpldateController
 * (Storing to Database) HTTP: CreateBlogList (Client) --> blogCreateController (server)
 * (Retrieving from Database) HTTP: ReadBlogList (server) --> BlogList.js (Client)
 * (Update Information) HTTP: UpdateBlogList (Client) --> blogUpdateController.js (server)
 */

const express = require('express');
const router = express.Router();
const Blogdata = require('../../models');
const { upload, deleteImg } = require('../../middleware/multer')
router.post('/', upload.array('images'), deleteImg, async function (req, res) {

	let id = req.body.id;
	let writer = req.body.writer;
	let title = req.body.title;
	let desc = req.body.desc;
	let type = req.body.mode;

	let uploadedImages = req.files;
	let imagesPath = [];
	let imgFile;
	let imgFileName;
	let stringImagesPath = "";
	//if user upload images
	if (type === 'update_images') {

		if (uploadedImages.length > 1) {
			for (const [i, image] of uploadedImages.entries()) {

				if (i === uploadedImages.length - 1) stringImagesPath += image.location;
				else stringImagesPath += image.location + ',';
			}
		} else if (uploadedImages.length === 1) stringImagesPath = req.files[0].location
		else stringImagesPath = null;

	}
	else if (type === 'update_nonImages') stringImagesPath = null;

	if (type === 'update_nonImages' || type === 'update_images') {

		await Blogdata.blogDataAdmin.update({
			writer: writer,
			title: title,
			description: desc,
			imagespath: stringImagesPath
		}, { where: { blog_id: id } })
			.then(result => {
				if (result > 0) res.json('Update success');
			})
			.catch(err => {
				res.json(err.errno);
			});
	}
	else {
		await Blogdata.blogDataAdmin.update({
			writer: writer,
			title: title,
			description: desc,
		}, { where: { blog_id: id } })
			.then(result => {
				if (result > 0) res.json('Update success');
			})
			.catch(err => {
				res.json(err);
			});
	}
})
module.exports = router;