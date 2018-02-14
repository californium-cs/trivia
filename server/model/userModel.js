const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  name: String,
  password: String,
  previousGames: [
    {date: Date, score: Number}
  ]
});

module.exports = mongoose.model('user', userSchema);
