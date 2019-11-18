var express = require("express");
var app = express();

var userController = require('../controllers/userController')
var bodyParser = require("body-parser");
var multiParty = require("connect-multiparty");
var md_upload = multiParty({ uploadDir: './upload/user' })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/usrs/:total?', userController.GetUsers);
app.get('/:id', userController.GetUser);
app.post('/usr', userController.CreateUser);
app.post('/img', md_upload, userController.UploadImage);
app.put('/:id', userController.UpdateUser);
app.delete('/:id', userController.DeleteUser);

module.exports = app;