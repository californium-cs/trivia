const express = require('express');
// const socket = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const dataController = require('./controllers/dataController.js');

// Use the public folder to send static assets
app.use(express.static(path.join(__dirname, './../client/public')));
app.use(bodyParser.json());

// mlab server
mongoose.connect('mongodb://simon:1072322sp@ds123718.mlab.com:23718/feedme-dev').then(() => console.log('connected to mLab'));


// Get question data
app.get('/getData', dataController.getData, dataController.formatData, (req, res, next) => {
  res.send(res.locals.questionData);
});

app.listen(3001, () => console.log('listening on port 3001'));
