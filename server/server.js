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
/*
this works!
*/
mongoose.connect('mongodb://agcb:agcbmlab21@ds233208.mlab.com:33208/californium')
                // ('mongodb://${user}:${pass}@${uri}/${db}?authSource=admin')
        .then(() => console.log('connected to mLab'))


        // .catch((err)=>return err;)

// Send root react page
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, './../client/public/index.html'));
});

app.post('/login', (req, res)=>{
  //I've confirmed that the following logs work correctly.
  let user = req.body.name //client input
  let pw = req.body.password//client input
  console.log(`inside the login ${user} ${pw}`);
  User.find({ name: user, password: pw }, (err, result) => {
    console.log(result)
    if (result.length) {
      res.send(req.body.name);
    }
    else {
      res.send(false);
    }
  });



});

app.post('/signup',(req,res)=> {
  let user = req.body.name //client input
  let pw = req.body.password//client input
  User.find({name: user },(err,result)=>{
    console.log(result)
    if (result.length>0) {
      res.send(false);
    }
    else {
      let newUser = new User({name:user,password:pw});
      newUser.save()
      .then(res.send(true))
    }
  })
});

app.post('/gameOver', (req,res)=>{
  /*
  request.body should be {"date":"20180213","score":"7"}
   .insert() the date and score into our player's previousGames array.
   how do I reference our user without putting some variable at global level??
   User.insert(req.body, previousGames....)
  */
  console.log(req.body);
  res.send(req.body);
});
app.listen(3000, () => console.log('listening on port 3000'));
