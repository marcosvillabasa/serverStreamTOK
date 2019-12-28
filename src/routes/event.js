'use strict'

// import express
const express = require('express');

//import controller
var EventController = require('../controllers/event');

//module Router
const app = express.Router()

app.get('/events', EventController.getEvents);
app.post('/event', EventController.postEvent);
app.put('/event/:id', EventController.updateEvent);
app.delete('/event/:id', EventController.deleteEvent);
app.get('/event/:id', EventController.getEventById);

module.exports = app;
