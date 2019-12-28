// import express
const express = require("express");

//import controller
let LoginController = require("../controllers/login");

//module Router
const app = express.Router();

app.post("/login", LoginController.login);
app.post("/google", LoginController.loginGoogle);

module.exports = app;
