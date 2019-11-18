"use strict";
var userModel = require("../models/userModel");
var validator = require("validator");
var userController = {
    GetUser: (req, resp, next) => {
        var id = req.params.id;
        if (id != null || count != undefined) {
            userModel.findById(id, (err, user) => {
                if (err || !user) {
                    return resp.status(500).json({
                        ok: false,
                        msg: "User not found",
                        err
                    });
                }
                return resp.status(200).json({
                    ok: true,
                    user
                });
            });
        } else {
            return resp.status(500).json({
                ok: false,
                msg: "Valitate your data"
            });
        }
    },
    GetUsers: (req, resp, next) => {
        var query = userModel.find({}, "name mail image rol");
        var count = req.params.total;
        if ((count != null || count != undefined) && validator.isNumeric(count)) {
            query.limit(Number(count));
        }
        query
            .sort("_name") //order desc
            .exec((err, users) => {
                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        msg: "Fail request Users",
                        err
                    });
                }
                return resp.status(200).json({
                    ok: true,
                    users: users
                });
            });
    },
    CreateUser: (req, resp) => {
        //Params
        var params = req.body;
        //Validator
        try {
            var validatorEmail = validator.isEmail(params.email);
            var validatorName = !validator.isEmpty(params.name);
            var validatorPassword = !validator.isEmpty(params.password);
        } catch (err) {
            return resp.status(500).json({
                ok: false,
                msg: "Fail request Users",
                err
            });
        }
        if (validatorEmail && validatorName && validatorPassword) {
            //Create object
            var newuser = new userModel();
            //Set values
            newuser.name = params.name;
            newuser.password = params.password;
            newuser.mail = params.email;

            newuser.save((err, userStored) => {
                if (err || !userStored) {
                    return resp.status(500).json({
                        ok: false,
                        msg: err + " " + userStored
                    });
                }
                //Send response
                return resp.status(200).json({
                    ok: true,
                    msg: "Insert Data",
                    user: newuser
                });
            });
        } else {
            return resp.status(500).json({
                ok: false,
                msg: "Fail request Users"
            });
        }
    },
    UpdateUser: (req, resp) => {
        var id = req.params.id;
        var params = req.body;
        try {
            var validatorMail = validator.isEmail(params.email);
            var validatorPassword = !validator.isEmpty(params.password);
        } catch (err) {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    msg: "Validate your data",
                    err
                });
            }
        }
        if (validatorMail && validatorPassword) {
            userModel.findByIdAndUpdate({ _id: id },
                params, { new: true },
                (err, userUpdated) => {
                    if (err) {
                        return resp.status(500).json({
                            ok: false,
                            msg: "Update user",
                            err
                        });
                    }
                    if (!userUpdated) {
                        return resp.status(404).json({
                            ok: false,
                            msg: "User not found",
                        });
                    }
                    return resp.status(200).json({
                        ok: true,
                        msg: "User updated",
                        user: userUpdated
                    });
                }
            );
        }
    },
    DeleteUser: (req, resp) => {
        var id = req.params.id;
        userModel.findOneAndDelete({ _id: id },
            (err, userDeleted) => {
                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        msg: "Update user",
                        err
                    });
                }
                if (!userDeleted) {
                    return resp.status(404).json({
                        ok: false,
                        msg: "User not found",
                    });
                }
                return resp.status(200).json({
                    ok: true,
                    msg: "User deleted",
                    user: userDeleted
                });
            }
        );
    },
    UploadImage: (req, resp) => {
        var file_name = "Image not load";
        var files = req.files;
        if (!req.files) {
            return resp.status(404).json({
                ok: false,
                msg: "Image not load",
            });
        }
        var file_path = req.files.file0.path;
        var relative_path = file_path.split('\\');
        /* for OX - LINUX
        var relative_path = file_path.split('/');
        */
        var extension = relative_path[2].split('.')[1];
        if (extension != 'jpg' && extension != 'jpeg' && extension != 'png' && extension != 'gif') {

        }

        return resp.status(200).json({
            ok: true,
            msg: "Image load",
            files
        });
    }
};

module.exports = userController;