"use strict";

var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
let ROLES = {
  values: ["ADMIN", "USER"],
  message: "{VALUE} not is a valid Rol",
};
var Schema = mongoose.Schema;

var userSchema = new Schema({
  mail: { type: String, unique: true, required: [true, "Mail is required"] },
  name: { type: String, required: [true, "Name is required"] },
  password: { type: String, required: [true, "Password is required"] },
  image: { type: String },
  rol: { type: String, required: true, default: "USER", enum: ROLES },
  token: { type: String },
  refreshToken: { type: String },
  session: { type: Boolean, default: "false" },
  state: { type: Boolean, default: "true" },
});

//Delete property of prototype when print object json
userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.plugin(uniqueValidator, { message: "{PATH} can be unique" });
module.exports = mongoose.model("user", userSchema);
