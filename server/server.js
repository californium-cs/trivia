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

mongoose.connect('mongodb://agcb:agcbmlab21@ds233208.mlab.com:33208/californium')
	.then(() => console.log('connected to mLab'));

app.get('/getData', dataController.getData, dataController.formatData, (req, res, next) => {
	res.send(res.locals.questionData);
});

app.post('/login', (req, res)=>{
  let username = req.body.data.username; //client input
  let pw = req.body.data.password;//client input
  User.find({ name: username, password: pw }, (err, result) => {
    if (result.length) {
      res.send('valid user');
    }
    else {
      res.send('invalid user');
    }
  });
});

app.post('/signup',(req,res)=> {
  let user = req.body.data.username //client input
  let pw = req.body.data.password//client input

	User.find({ name: user },(err,result)=>{
    if (result.length > 0) {
      res.send('Sorry, you already exist');
    }
    else {
      let newUser = new User( {name:user, password:pw} );
      newUser.save()
      .then(res.send('User has been saved'));
    }
  })
})


app.listen(3000, () => console.log('listening on port 3000'));
