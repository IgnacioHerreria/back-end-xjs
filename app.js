"use strict";

//Módulos
const express = require("express");
const app = express();
//Import routes
const appRoutes = require("./routes/app");
app.use("/api", appRoutes);
//Exportar modulo
module.exports = app;
