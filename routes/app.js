"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./user");
const articleRoutes = require("./article");

//folder
app.use(express.static(__dirname + "/public"));
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config headers y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routes
app.use("/usr", userRoutes);
app.use("/art", articleRoutes);

module.exports = app;
