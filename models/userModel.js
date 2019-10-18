var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  mail: { type: String, unique: true, required: [true, "Mail is required"] },
  password: { type: String, required: [true, "Password is required"] },
  image: { type: String },
  rol: { type: String, required: true, default: "USER_ROL" }
});

module.exports = mongoose.model("user", userSchema);
