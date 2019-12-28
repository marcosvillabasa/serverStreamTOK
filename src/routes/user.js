// import express
const express = require('express');

//import controller
var UserController = require('../controllers/user');

//module Router
const app = express.Router()

//middlewares
const { checkToken } = require('../middlewares/auth');

//routes
app.post('/signin', UserController.postUser);
app.put('/user/:id', UserController.updateUser);
app.get('/getusers', UserController.getUsers);
app.delete('/delete/:id', UserController.deleteUser);
app.get('/user/:id', UserController.getUserById);

//exports router
module.exports = app;
