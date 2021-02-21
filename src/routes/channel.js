'use strict'

// import express
const express = require('express');

//import controller
var ChannelController = require('../controllers/channel');

//module Router
const app = express.Router()

app.get('/channels', ChannelController.getChannels);
app.post('/channel', ChannelController.createChannel);
app.put('/channel/:id', ChannelController.updateChannel);
app.delete('/channel/:id', ChannelController.deleteChannel);

module.exports = app;