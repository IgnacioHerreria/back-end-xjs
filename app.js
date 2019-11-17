'use strict'

//Requires
var express = require("express");
var mongoose = require("mongoose");

//Initialization
var app = express();

//Import routes
var appRoutes = require("./routes/app");
var userRoutes = require("./routes/user");

//Conecction DB
//  Functionallitys
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(
    "mongodb://localhost:27017/Physiotherapy", { useNewUrlParse: true },
    (err, res) => {
        if (err) throw err;
        console.log("Database mongo");
    }
);
mongoose.set('useCreateIndex', true);

// load routes
app.use('/', appRoutes);
app.use('/usr', userRoutes);

const ENV_PORT = 3000;

//Listen request
app.listen(ENV_PORT, () => {
    console.log(`Express ${ENV_PORT}: online`);
});