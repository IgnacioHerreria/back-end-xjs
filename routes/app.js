'use strict'

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const userRoutes = require("./user");

//middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/usr", userRoutes);

module.exports = app;