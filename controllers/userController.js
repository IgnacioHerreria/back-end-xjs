"use strict";
var userModel = require("../models/userModel");
var validator = require("validator");
var userController = {
    test: (req, resp) => {
        resp.status(200).json({
            ok: true
        });
    },

    users: (req, resp, next) => {
        userModel.find({}, "name mail image rol").exec((error, users) => {
            if (error) {
                return resp.status(500).json({
                    ok: false,
                    msg: "Fail request Users",
                    error
                });
            }
            resp.status(200).json({
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
        } catch (error) {
            return resp.status(500).json({
                ok: false,
                msg: "Fail request Users",
                error
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
                    resp.status(500).json({
                        ok: false,
                        msg: err + " " + userStored
                    });
                }
                //Send response
                resp.status(200).json({
                    ok: true,
                    msg: "Insert Data",
                    user: newuser
                });
            });

        } else {
            resp.status(500).json({
                ok: false,
                msg: "Fail request Users"
            });
        }
    }
};

module.exports = userController;