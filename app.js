//Requires
var express = require("express");
var mongoose = require("mongoose");

//Initialization
var app = express();

//Import routes
var appRoutes = require("./routes/app");
var userRoutes = require("./routes/user");

//Conecction DB
mongoose.connection.openUri(
  "mongodb://localhost:27017/Physiotherapy",
  (err, res) => {
    if (err) throw err;
    console.log("Database mongo");
  }
);


app.use('/', appRoutes);
app.use('/users', userRoutes);

const ENV_PORT = 3000;

//Listen request
app.listen(ENV_PORT, () => {
  console.log(`Express ${ENV_PORT}: online`);
});
