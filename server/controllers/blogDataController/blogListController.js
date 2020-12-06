/**
 * last updated: Nov 26 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This Server works for sending data to client(BlogList).
 * 
 *
 * Map: server -> blogListController
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

  let findAllResults;
  let allData = [];
  let datas = [];
  let findCommentsResults = [];


  Blogdata.blogDataAdmin.findAll()

    .then(results => {
      findAllResults = results;
      console.log('1');

      for (let i = 0; i < findAllResults.length; i++) {


        let eachData = {
          id: String,
          writer: String,
          title: String,
          desc: String,
          imagePaths: Array,
          comments: Array,
          createdAt: String,
          updatedAt: String
        };
        eachData.writer = String(findAllResults[i].dataValues.writer);
        eachData.title = String(findAllResults[i].dataValues.title);
        eachData.desc = String(findAllResults[i].dataValues.description);
        eachData.imagePaths = String(findAllResults[i].dataValues.imagespath);
        eachData.id = String(findAllResults[i].dataValues.blog_id);
        eachData.createdAt = String(findAllResults[i].dataValues.createdAt);
        eachData.updatedAt = String(findAllResults[i].dataValues.updatedAt);
        datas.push(eachData);
        console.log('2');
      }
      allData.push(datas);
    })

  Blogdata.blogcomments.findAll()

    .then(results => {

      allData.push(results);
      console.log('results: ', results);
      console.log('allData: ', allData);
      res.send(allData);
    })

    .then(err => {
      res.json(err);
    });


});

module.exports = router;