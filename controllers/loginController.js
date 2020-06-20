"use strict";
const userModel = require("../models/userModel");
const validator = require("validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const _ = require("underscore");

var loginController = {
  login: (req, res) => {
    //Params
    var params = req.body;
    //Validator
    try {
      var validatorEmail = validator.isEmail(params.email);
      var validatorName = !validator.isEmpty(params.name);
      var validatorPassword = !validator.isEmpty(params.password);
    } catch (err) {
      return res.status(500).json({
        ok: false,
        msg: "Fail request Users",
        err,
      });
    }
    if (validatorEmail && validatorName && validatorPassword) {
      //Create object - Set values
      var newuser = new userModel({
        name: params.name,
        password: bcrypt.hashSync(params.password, 10),
        mail: params.email,
        rol: params.role,
      });

      newuser.save((err, userStored) => {
        if (err || !userStored) {
          return res.status(500).json({
            ok: false,
            msg: err + " " + userStored,
          });
        }
        //Send response
        return res.status(200).json({
          ok: true,
          msg: "Insert Data",
          user: newuser,
        });
      });
    } else {
      return res.status(500).json({
        ok: false,
        msg: "Fail request Users",
      });
    }
  },
};

module.exports = loginController;
