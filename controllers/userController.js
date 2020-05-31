"use strict";
const userModel = require("../models/userModel");
const validator = require("validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const _ = require("underscore");

var userController = {
  CreateUser: (req, res) => {
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
  UpdateUser: (req, res) => {
    var id = req.params.id;
    var params = _.pick(req.body, ["mail", "rol", "state"]);
    try {
      var validatorMail = validator.isEmail(params.mail);
      var validatorState = validator.isBoolean(params.state);
      var validatorRol = !validator.isEmpty(params.rol);
    } catch (err) {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: "Validate your data",
          err,
        });
      }
    }
    if (validatorMail && validatorRol && validatorState) {
      userModel.findByIdAndUpdate(
        { _id: id },
        { params },
        { new: true, runValidators: true },
        (err, userUpdated) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              msg: "Update user",
              err,
            });
          }
          if (!userUpdated) {
            return res.status(404).json({
              ok: false,
              msg: "User not found",
            });
          }
          return res.status(200).json({
            ok: true,
            msg: "User updated",
            user: userUpdated,
          });
        }
      );
    } else {
      return res.status(500).json({
        ok: false,
        msg: "Validate data",
      });
    }
  },
  DeleteUser: (req, res) => {
    var id = req.params.id;
    userModel.findOneAndDelete({ _id: id }, (err, userDeleted) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: "Update user",
          err,
        });
      }
      if (!userDeleted) {
        return res.status(404).json({
          ok: false,
          msg: "User not found",
        });
      }
      return res.status(200).json({
        ok: true,
        msg: "User deleted",
        user: userDeleted,
      });
    });
  },
  UploadImage: (req, res) => {
    var idUser = req.params.id;

    if (!idUser || idUser === undefined || !req.files) {
      return res.status(500).json({
        ok: false,
        msg: "Validate data",
      });
    }

    var file_path = req.files.file0.path;
    var relative_path = file_path.split("\\");
    var file_name = relative_path[2];
    /* for OX - LINUX
        var relative_path = file_path.split('/');
        */
    var extension = file_name.split(".")[1];
    if (
      extension != "jpg" &&
      extension != "jpeg" &&
      extension != "png" &&
      extension != "gif"
    ) {
      fs.unlink(file_path, (err) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            msg: "Error on delete file",
            err,
          });
        }
        return res.status(500).json({
          ok: false,
          msg: "Image not load, validate your data",
        });
      });
    } else {
      userModel.findOneAndUpdate(
        { _id: idUser },
        { image: file_name },
        { new: true, runValidators: true },
        (err, userUpdated) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              msg: "Error updating user",
              err,
            });
          }
          return res.status(200).json({
            ok: true,
            msg: "Success",
            userUpdated,
          });
        }
      );
    }
  },
  GetUser: (req, res, next) => {
    var id = req.params.id;
    if (id != null || id != undefined) {
      userModel.findById(id, (err, user) => {
        if (err || !user) {
          return res.status(500).json({
            ok: false,
            msg: "User not found",
            err,
          });
        }
        return res.status(200).json({
          ok: true,
          user,
        });
      });
    } else {
      return res.status(500).json({
        ok: false,
        msg: "Valitate your data",
      });
    }
  },
  GetUsers: (req, res, next) => {
    var query = userModel.find({}, "name mail image rol");
    let from = req.query.from || 0;
    let limit = req.query.limit || 5;
    from = Number(from);
    limit = Number(limit);
    query
      .skip(from)
      .limit(limit)
      .sort("_name") //order desc
      .exec((err, users) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            msg: "Fail request Users",
            err,
          });
        }
        userModel.count({}, (err, count) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              msg: "Fail request Users",
              err,
            });
          }
          return res.status(200).json({
            ok: true,
            users: users,
            count,
          });
        });
      });
  },
  getUserImage: (req, res) => {
    var idUser = req.params.id;

    if (!idUser || idUser === undefined) {
      return res.status(500).json({
        ok: false,
        msg: "Validate data",
      });
    }
    userModel.findById({ _id: idUser }, (err, user) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: "Error on get user",
          err,
        });
      }
      if (!user) {
        return res.status(500).json({
          ok: false,
          msg: "User not found",
        });
      }
      if (user.image) {
        var path_file = "./upload/user/" + user.image;
        fs.exists(path_file, (exist) => {
          if (exist) {
            return res.status(200).sendFile(path.resolve(path_file));
          } else {
            return res.status(404).json({
              ok: false,
              msg: "Image not found",
            });
          }
        });
      }
    });
  },
};

module.exports = userController;
