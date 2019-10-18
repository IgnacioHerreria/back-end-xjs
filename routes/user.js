var express = require("express");

var app = express();
var userModel = require("../models/userModel");

app.get("/", (req, resp, next) => {
  userModel.find({}, "name mail image rol").exec((error, users) => {
    if (error) {
      return resp.status(500).json({
        ok: false,
        msj: "Fail request Users",
        error
      });
    }

    resp.status(200).json({
      ok: true,
      users: users
    });
  });
});

module.exports = app;
