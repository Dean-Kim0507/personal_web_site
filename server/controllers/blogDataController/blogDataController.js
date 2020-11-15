// let sequelize = require('../../models/index').sequelize;
const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());
const Blogdata  = require('../../models');

router.post('/', async function(req, res) {

  let writer = req.body.writer;
	let title = req.body.title;
  let desc = req.body.desc;
  let type = req.body.mode;
  


  let uploadedImages = req.files;
  let imagesPath = [];
  let imgFile;
  let imgFileName;
  let randomNumber;
  //create mode
  if(type === 'create'){
    //if user upload images
    if(uploadedImages != undefined){
      // if file name has ,(that mark is to divide each file address) give a new name(random number)
      if(Array.isArray(uploadedImages.images)){
        for(let i=0; i<uploadedImages.images.length; i++){
          imgFile = uploadedImages.images[i];
          if(imgFile.name.indexOf(',') != -1) {
            randomNumber = Math.floor(Math.random()*10000);
            imgFileName = randomNumber+'.jpg';
          }
          else imgFileName = imgFile.name;
          imagesPath[i]  = '../Client/public/uploadImages/blog/'+"blogImg"+Date.now()+imgFileName;
          imgFile.mv( imagesPath[i]
        , function(err) {
          if (err) return res.status(500).send(err);
          }
          );
        }
    }
    //if user just upload a image
      else {imgFile = uploadedImages.images;
        if(imgFile.name.indexOf(',') != -1) {
          randomNumber = Math.floor(Math.random()*10000);
          imgFileName = randomNumber+'.jpg';
        }
        else imgFileName = imgFile.name;
      imagesPath[0] = '../Client/public/uploadImages/blog/'+"blogImg"+Date.now()+imgFileName;

      imgFile.mv(imagesPath[0])
        // , function(err) {
        //   if (err) return res.status(500).send(err);
        //   });
        }
  // generate multiple or just one image path
    for(let a=0; a<imagesPath.length; a++){
      if(imagesPath.length==1) stringImagesPath = imagesPath[a];
      else if (a==0) stringImagesPath = imagesPath[a]+',';
      else if (a==imagesPath.length-1) stringImagesPath += imagesPath[a];
      else stringImagesPath += imagesPath[a]+',';
    }
  }
  else stringImagesPath = null;

  await Blogdata.blogDataAdmin.create({
      writer: writer,
      title: title,
      description: desc,
      imagespath: stringImagesPath
    })
    .then(() => {
      res.json('Upload success');
     })
    .catch(err => {
      res.json(err);
    });
  }
});

module.exports = router;