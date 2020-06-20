var express = require("express");
var app = express();

var userC = require("../controllers/userController");

app.get("/usrs/:total?", userC.GetUsers);
app.get("/:id", userC.GetUser);
app.post("/crt", userC.CreateUser);
app.post("/img", md_upload, userC.UploadImage);
app.get("/img/:id", userC.getUserImage);
app.put("/:id", userC.UpdateUser);
app.delete("/:id", userC.DeleteUser);

module.exports = app;
