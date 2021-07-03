const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
// aws.config.loadFromPath(__dirname + '/../config/s3.js');
const awsConfig = require('../config/s3')
const s3 = new aws.S3(awsConfig);

//=================================
//             Multer
// Uplaode image(s) to AWS S3
//=================================

// Upload image
const body = multer();

// Upload image
const upload =
	multer({
		storage: multerS3({
			s3: s3,
			bucket: 'dean-website/myblog/blogimages',
			acl: 'public-read',
			key: function (req, images, cb) {
				cb(null, Date.now() + '.' + images.originalname.split('.').pop());
			}
		}),
		limits: { fileSize: 5242880, files: 5 },
	}, 'NONE');

// Delete image
async function deleteImg(req, res, next) {
	if (req.body.mode === 'update_images' || req.body.mode === 'update_nonImages' || req.body.mode === 'delete') {
		//Extract the image name
		// let imgName = req.body.images.split('/').pop();

		let delimg = req.body.delimg.split(',');
		if (delimg.length > 1) {
			for (const [i, image] of delimg.entries()) {
				let imgName = image.split('/').pop();
				console.log(imgName)
				const params = {
					Bucket: 'dean-website/myblog/blogimages',
					Key: imgName
				}
				s3.deleteObject(params, function (err, data) {
					if (err) {
						console.log('Image delete error')
						console.log(err)
						return res.status(403).send(err)
					} else {
						console.log('Delete success')
					}
				})
			}
		}
		else {
			let imgName = req.body.delimg.split('/').pop();

			const params = {
				Bucket: 'dean-website/myblog/blogimages',
				Key: imgName
			}
			s3.deleteObject(params, function (err, data) {
				if (err) {
					console.log('Image delete error')
					console.log(err)
					return res.status(403).send(err)
				} else {
					console.log('Delete success')
				}
			})
		}
	}
	if (next) next()
}
module.exports = {
	upload,
	deleteImg,
	body
}