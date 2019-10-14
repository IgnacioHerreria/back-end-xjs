//Requires
var express = require("express");
var mongoose = require("mongoose");

//Conecction DB
mongoose.connection.openUri(
  "mongodb://localhost:27017/Fisioterapia",
  (err, res) => {
    if (err) throw err;

    console.log("Database mongo");
  }
);
//Initialization
var app = express();
app.get("/", (req, resp, next) => {
  resp.status(200).json({
    ok: true,
    msj: ""
  });
});

const ENV_PORT = 3000;
//Listen request
app.listen(ENV_PORT, () => {
  console.log(`Express ${ENV_PORT}: online`);
});
