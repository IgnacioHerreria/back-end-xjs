'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();



//middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.get("/", (req, resp, next) => {
    resp.status(200).json({
        ok: true,
        msj: "Request ok"
    });
});

module.exports = app;