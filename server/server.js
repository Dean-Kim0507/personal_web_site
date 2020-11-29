const express = require('express');
const app = express();
const sendData = require('./controllers/CommunityPostController/sendData')
const receiveData = require('./controllers/CommunityPostController/receiveData')
const blogData = require('./controllers/blogDataController/blogCreateController');
const blogList = require('./controllers/blogDataController/blogListController');
const retrieveBlog = require('./controllers/blogDataController/blogRetrieveController');
const updateBlog = require('./controllers/blogDataController/blogUpdateController');
const port = process.env.PORT || 4000;
const cors = require('cors');
const Blogdata = require('./models');

// default option to connect database by sequelize
Blogdata.sequelize.sync()
  .then(() => {
    console.log('✓ DB connection success.');
    console.log('  Press CTRL-C to stop\n');
  })
  .catch(err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  });

// const corsOptions = {
//   origin: "*",
//   methods: "GET, PUT, PATCH, POST, DELETE",
//   exposedHeaders: "*"
//   };

app.use(cors());


app.use(express.json())

app.use('/communitypost/receivedata', receiveData);
app.use('/communitypost/senddata', sendData);
app.use('/blog/create', blogData)
app.use('/blog/list', blogList)
app.use('/blog/retrieveblog', retrieveBlog)
app.use('Upload success', updateBlog)

app.listen(port, function () {
  console.log(`connected ${port} port!`);
});

