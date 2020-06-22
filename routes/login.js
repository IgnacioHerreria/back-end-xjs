var express = require("express");
var app = express();

var userC = require("../controllers/loginController");

app.post("/", userC.login);

module.exports = app;