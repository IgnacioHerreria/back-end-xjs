"use strict";
const userModel = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var loginController = {
    login: (req, res) => {
        //Params
        var params = req.body;
        //Validator
        try {
            var validatorEmail = validator.isEmail(params.email);
            var validatorPassword = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(500).json({
                ok: false,
                msg: "Fail request Users",
                err,
            });
        }
        if (validatorEmail && validatorPassword) {
            userModel.findOne({ mail: params.email }, (err, user) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: err,
                    });
                }
                if (!user) {
                    return res.status(400).json({
                        ok: false,
                        msg: "User or password incorrect",
                    });
                }
                if (!bcrypt.compareSync(params.password, user.password)) {
                    return res.status(400).json({
                        ok: false,
                        msg: "User or password incorrect",
                    });
                }

                let token = jwt.sign({
                        usuario: user._id,
                    },
                    process.env.SEED_TOKEN, { expiresIn: 60 * 60 }
                );
                //Send response
                return res.status(200).json({
                    ok: true,
                    msg: "OK",
                    user,
                    token,
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