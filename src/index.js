const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('../config/config');
const path = require('path')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// habilitar public
app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect('mongodb://localhost:27017/streamtok', { useNewUrlParser: true });


//routes
app.use(config.endpoint, require('./routes/user'));
app.use(config.endpoint, require('./routes/event'));
app.use(config.endpoint, require('./routes/login'));

app.listen(config.port, () => {
    console.log(`Listening port ${config.port}`);
})
