const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  category: String,
  order: Number,
  question: {
    type: String,
    required: true
  },
  answer: String,
  one: String,
  two: String,
  three: String,
});

module.exports = mongoose.model('First', questionSchema)

