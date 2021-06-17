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

router.post('/', async function (req, res) {
  console.log('blogCreatedController: ', req.body);
  console.log('blogCreatedController: ', req.files);
  const writer = req.body.writer;
  const title = req.body.title;
  const desc = req.body.desc;
  const type = req.body.mode;
  const isLogedIn = req.body.isLogedIn;
  const BLOG_CREATE_SUCCESS = 'BLOG_CREATE_SUCCESS';
  let uploadedImages = req.files;

  let imagesPath = [];
  let imgFile;
  let imgFileName;
  let userID;

  if (req.body.userID === 'null') userID = null
  else userID = req.body.userID;

  // create mode
  if (type === 'create') {
    //if user upload images
    if (uploadedImages != undefined) {
      // if file name has ,(that mark is to divide each file address) give a new name(random number)
      if (Array.isArray(uploadedImages.images)) {
        for (let i = 0; i < uploadedImages.images.length; i++) {
          imgFile = uploadedImages.images[i];
          if (imgFile.name.indexOf(',') != -1 || imgFile.name.indexOf(' ') != -1) {
            imgFileName = imgFile.name;
            imgFileName = imgFileName.replace(/ /g, '');
            imgFileName = imgFileName.replace(/,/g, '');
          }
          else imgFileName = imgFile.name;
          imagesPath[i] = './Client/public/uploadImages/blog/' + "blogImg" + Date.now() + imgFileName;
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
        if (imgFile.name.indexOf(',') != -1 || imgFile.name.indexOf(' ')) {
          imgFileName = imgFile.name;
          imgFileName = imgFileName.replace(/ /g, '');
          imgFileName = imgFileName.replace(/,/g, '');
        }
        else imgFileName = imgFile.name;
        imagesPath[0] = './Client/public/uploadImages/blog/' + "blogImg" + Date.now() + imgFileName;

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