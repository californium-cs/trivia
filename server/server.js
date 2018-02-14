const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const dataController = require('./controllers/dataController.js');
const User = require('./model/userModel.js');

// Use the public folder to send static assets
app.use(express.static(path.join(__dirname, './../client/public')));
app.use(bodyParser.json());

// mlab server
mongoose.connect('mongodb://agcb:agcbmlab21@ds233208.mlab.com:33208/californium')
  .then(() => console.log('connected to mLab'))

// Get question data
app.get('/getData', dataController.getData, dataController.formatData, (req, res, next) => {
  res.send(res.locals.questionData);
});

// Post route for login
app.post('/login', (req, res) => {
  const user = req.body.name;
  const pw = req.body.password;
  console.log(`inside the login ${user} ${pw}`);
  User.find({ name: user, password: pw }, (err, result) => {
    console.log(result);
    if (result.length) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

// Post route for signup
app.post('/signup', (req, res) => {
  const user = req.body.name;
  const pw = req.body.password;
  User.find({ name: user }, (err, result) => {
    console.log(result);
    if (result.length > 0) {
      res.send(false);
    } else {
      let newUser = new User({ name: user, password: pw });
      newUser.save()
        .then(res.send(true));
    }
  });
});

app.listen(3001, () => console.log('listening on port 3001'));
