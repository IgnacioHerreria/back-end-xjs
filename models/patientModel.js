'use strict'

var mongoosee = require('mongoose');
var Schema = mongoosee.Schema;

var patientSchema = Schema({
    description: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoosee.model('Patient', patientSchema);