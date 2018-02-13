const express = require('express');
// const socket = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
dataController = require('./controllers/dataController.js');

// Use the public folder to send static assets
app.use(express.static(path.join(__dirname, './../client/public')));
app.use(bodyParser.json());

// mlab server
mongoose.connect('mongodb://agcb:agcbmlab21@ds233208.mlab.com:33208/californium')
  .then(() => console.log('connected to mLab'));
	console.log()
// Send root react page
app.get('/getData', dataController.getData, dataController.formatData, (req, res, next) => {
	res.send(res.locals.questionData);
});

app.listen(3000, () => console.log('listening on port 3000'));
