"use strict";

//Módulos
const express = require("express");
const path = require("path");
const app = express();
//Import routes
const appRoutes = require("./routes/app");
app.use("/api", appRoutes);

//folder
app.use(express.static(path.resolve(__dirname, "./public")));

//Exportar modulo
module.exports = app;