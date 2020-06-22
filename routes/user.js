var express = require("express");
var app = express();

const { verificacionToken } = require("../middlewares/auth");

var userC = require("../controllers/userController");
var multiParty = require("connect-multiparty");
var md_upload = multiParty({ uploadDir: "./upload/user" });

app.get("/usrs/:total?", verificacionToken, userC.GetUsers);
app.get("/:id", verificacionToken, userC.GetUser);
app.post("/crt", verificacionToken, userC.CreateUser);
app.post("/img", verificacionToken, md_upload, userC.UploadImage);
app.get("/img/:id", verificacionToken, userC.getUserImage);
app.put("/:id", verificacionToken, userC.UpdateUser);
app.delete("/:id", verificacionToken, userC.DeleteUser);

module.exports = app;