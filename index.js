"use strict";
require("./config/config");
//Requires
var mongoose = require("mongoose");

var app = require("./app");

var URL = "http://localhost:";

//Conecction DB
//  Functionallitys
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", true);
mongoose.set("useCreateIndex", true);

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database mongo running");
    //Servidor
    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${URL}${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));

//Listen request
