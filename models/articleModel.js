"use strict";

var mongosee = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var Schema = mongosee.Schema;

var articleSchema = new Schema({
  title: { type: String, unique: true, required: [true, "Title is required"] },
  content: { type: String, required: [true, "Content is required"] },
  date: { type: Date, default: Date.now },
  img: { type: String },
  state: { type: Boolean },
});

articleSchema.plugin(uniqueValidator, { message: "{PATH} can be unique" });

module.exports = mongosee.model("article", articleSchema);
