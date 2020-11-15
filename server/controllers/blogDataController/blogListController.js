// let sequelize = require('../../models/index').sequelize;
const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());
const Blogdata  = require('../../models');


router.post('/', async function(req, res) {
  
  let findAllResults;
  let allData=[];
 
   Blogdata.blogDataAdmin.findAll() 
	.then(results => {
        findAllResults = results;
        
        for (let i=0; i<findAllResults.length; i++){
          let eachData ={
            writer: String,
            title: String,
            desc: String,
            imagePaths: Array
          }; 
          eachData.writer = String(findAllResults[i].dataValues.writer);
          eachData.title = String(findAllResults[i].dataValues.title);
          eachData.desc = String(findAllResults[i].dataValues.description);
          eachData.imagePaths = String(findAllResults[i].dataValues.imagespath);

          // 
         allData.push(eachData);
      }
      res.send(allData); 
    })
    .then(err => {
        res.json(err);
	});
	
	
  });

module.exports = router;