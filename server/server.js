const express = require('express');
const app = express();
require('dotenv').config()
const Blogdata = require('./models');
const sendData = require('./controllers/CommunityPostController/sendData')
const receiveData = require('./controllers/CommunityPostController/receiveData')
const blogCreate = require('./controllers/blogDataController/blogCreateController');
const blogList = require('./controllers/blogDataController/blogListController');
const retrieveBlog = require('./controllers/blogDataController/blogRetrieveController');
const updateBlog = require('./controllers/blogDataController/blogUpdateController');
const deleteBlog = require('./controllers/blogDataController/blogDeleteController');
const blogComments = require('./controllers/blogDataController/blogCommentsController');
const registration_user = require('./controllers/registrationController');
const login = require('./controllers/loginController');
const update_user = require('./controllers/userUpdateController');
const userController = require('./controllers/userController');
const find_id_email = require('./controllers/findIDEmailController');
const verifySignUp = require("./middleware/verifySignUp");
const authJwt = require("./middleware/authJwt");
const verifyForgot = require("./middleware/verifyForgot");
const vefiryResetPasswordToken = require("./middleware/vefiryResetPasswordToken");
const reset_password = require('./controllers/resetPasswordController');
const adminPage = require('./controllers/adminPageController');
const port = process.env.PORT || 5000; //if deploy use, process.env.PORT will be used
const cors = require('cors');
const { body } = require('./middleware/multer');

(async () => {
  await Blogdata.sequelize.sync()
    .then(() => {
      console.log('✓ DB connection success.');
      console.log('  Press CTRL-C to stop\n');
    })
    .catch(err => {
      console.error(err);
      console.log('✗ DB connection error. Please make sure DB is running.');
      process.exit();
    });
})();

app.use(cors());
app.use(express.json())

app.use('/api/communitypost/receivedata', receiveData);
app.use('/api/communitypost/senddata', sendData);
app.use('/api/blog/create', blogCreate);
app.use('/api/blog/create/logedin', authJwt.verifyToken, blogCreate);
app.use('/api/blog/list', blogList);
app.use('/api/blog/retrieveblog', retrieveBlog);
app.use('/api/blog/update', updateBlog);
app.use('/api/blog/delete', deleteBlog);
app.use('/api/blog/comments', blogComments);
app.use('/api/registration', verifySignUp.checkDuplicateUsernameOrEmail, registration_user);
app.use('/api/login', login);
app.use('/api/userupdate', authJwt.verifyToken, update_user);
app.use('/api/find_id_password', verifyForgot.findUserIDEmail, find_id_email);
app.use('/api/reset_password', vefiryResetPasswordToken.verifyToken, reset_password);
app.get('/api/isloggedin', authJwt.verifyToken, userController.loginValid);
app.use('/api/admin', authJwt.isAdmin, adminPage);
app.listen(port, function () {
  console.log(`connected ${port} port!`);
});

