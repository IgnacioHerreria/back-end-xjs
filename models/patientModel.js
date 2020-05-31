"use strict";

var mongoosee = require("mongoose");
var Schema = mongoosee.Schema;

var pacienteSchema = Schema({
  name: { type: String, require: [true, "Name is required"] },
  lastname: { type: String, require: [true, "Last Name is required"] },
  birthday: { type: Date, require: [true, "Birth day is required"] },
});

module.exports = mongoosee.model("paciente", pacienteSchema);
