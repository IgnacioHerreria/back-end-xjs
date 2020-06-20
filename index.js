"use strict";
require("./config/config");
//Requires
var mongoose = require("mongoose");

var app = require("./app");

//Conecction DB
//  Functionallitys
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", true);
mongoose.set("useCreateIndex", true);

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.URI_MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //Servidor
    app.listen(process.env.PORT, () => {
      console.log(`Server running on PORT:${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));

//Listen request
