var express = require("express");
var app = express();
var userController = require('../controllers/userController')
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/usr', userController.test);
app.get('/usrs', userController.users);
app.post('/usr', userController.CreateUser);

module.exports = app;