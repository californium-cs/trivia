const express = require('express');
// const socket = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Use the public folder to send static assets
app.use(express.static(path.join(__dirname, './../client/public')));
app.use(bodyParser.json());

// mlab server
mongoose.connect('mongodb://agcb:agcbmlab!1@ds233208.mlab.com:33208/californium')
  .then(() => console.log('connected to mLab'));

// Send root react page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/public/index.html'));
});

app.listen(3000, () => console.log('listening on port 3000'));
