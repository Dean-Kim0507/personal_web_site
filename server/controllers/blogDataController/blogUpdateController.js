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
const fileUpload = require('express-fileupload');
router.use(fileUpload());
const Blogdata = require('../../models');

router.post('/', async function (req, res) {

	let id = req.body.id;
	let writer = req.body.writer;
	let title = req.body.title;
	let desc = req.body.desc;
	let type = req.body.mode;

	let uploadedImages = req.files;
	let imagesPath = [];
	let imgFile;
	let imgFileName;
	let randomNumber;

	//if user upload images
	if (type === 'update_images') {

		// if file name has ,(that mark is to divide each file address) give a new name(random number)
		if (Array.isArray(uploadedImages.images)) {
			for (let i = 0; i < uploadedImages.images.length; i++) {
				imgFile = uploadedImages.images[i];
				if (imgFile.name.indexOf(',') != -1) {
					randomNumber = Math.floor(Math.random() * 10000);
					imgFileName = randomNumber + '.jpg';
				}
				else imgFileName = imgFile.name;
				imagesPath[i] = '../Client/public/uploadImages/blog/' + "blogImg" + Date.now() + imgFileName;
				imgFile.mv(imagesPath[i]
					, function (err) {
						if (err) return res.status(500).send(err);
					}
				);
			}
		}

		//if user just upload a image
		else {
			imgFile = uploadedImages.images;
			if (imgFile.name.indexOf(',') != -1) {
				randomNumber = Math.floor(Math.random() * 10000);
				imgFileName = randomNumber + '.jpg';
			}
			else imgFileName = imgFile.name;
			imagesPath[0] = '../Client/public/uploadImages/blog/' + "blogImg" + Date.now() + imgFileName;

			imgFile.mv(imagesPath[0])
		}

		// generate multiple or just one image path
		for (let a = 0; a < imagesPath.length; a++) {
			if (imagesPath.length == 1) stringImagesPath = imagesPath[a];
			else if (a == 0) stringImagesPath = imagesPath[a] + ',';
			else if (a == imagesPath.length - 1) stringImagesPath += imagesPath[a];
			else stringImagesPath += imagesPath[a] + ',';
		}
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