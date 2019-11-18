"use strict";

//Requires
var express = require("express");
var mongoose = require("mongoose");

//Initialization
var app = express();

//Import routes
var appRoutes = require("./routes/app");

//Conecction DB
//  Functionallitys
mongoose.set('useNewUrlParser', true)
mongoose.set("useFindAndModify", true);
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Physiotherapy", (err, res) => {
    if (err) throw err;
    console.log("Database mongo");
});

// load routes
app.use("/api", appRoutes);

const ENV_PORT = 3000;

//Listen request
app.listen(ENV_PORT, () => {
    console.log(`Express ${ENV_PORT}: online`);
});