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
const Blogdata = require('../../models');
const { upload, deleteImg } = require('../../middleware/multer')

router.post('/', upload.array('images'), async function (req, res) {
  const writer = req.body.writer;
  const title = req.body.title;
  const desc = req.body.desc;
  const type = req.body.mode;
  const isLogedIn = req.body.isLogedIn;
  const BLOG_CREATE_SUCCESS = 'BLOG_CREATE_SUCCESS';
  let uploadedImages = req.files;
  let stringImagesPath = "";
  let userID;

  if (req.body.userID === 'null') userID = null
  else userID = req.body.userID;
  // create mode
  if (type === 'create') {
    // if user upload images

    if (uploadedImages.length > 1) {
      for (const [i, image] of uploadedImages.entries()) {

        if (i === uploadedImages.length - 1) stringImagesPath += image.location;
        else stringImagesPath += image.location + ',';
      }
    } else if (uploadedImages.length === 1) stringImagesPath = req.files[0].location
    else stringImagesPath = null;

    await Blogdata.blogDataAdmin.create({
      writer: writer,
      title: title,
      description: desc,
      imagespath: stringImagesPath,
      userID: userID,
      isLogedIn: isLogedIn
    })
      .then(() => {
        res.json({ message: BLOG_CREATE_SUCCESS });
      })
      .catch(err => {
        res.json(err);
      });
  }

});

module.exports = router;