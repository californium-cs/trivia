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
/*
this works!
*/
mongoose.connect('mongodb://agcb:agcbmlab21@ds233208.mlab.com:33208/californium')
                // ('mongodb://${user}:${pass}@${uri}/${db}?authSource=admin')
        .then(() => console.log('connected to mLab'));
        // .catch((err)=>return err;)

// Send root react page
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, './../client/public/index.html'));
});

app.listen(3001, () => console.log('listening on port 3000'));
