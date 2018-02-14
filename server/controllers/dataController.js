const Data = require('./../model/questionModel');
const Trivia = require('trivia-api');
const trivia = new Trivia({ encoding: 'url3986' });

const dataController = {
  getData: function (req, res, next) {
	  let options = {
	  	category: 18, // computers category
		  type: 'multiple',
		  amount: 10,
	  };
	  trivia.getQuestions(options)
		  .then(function (questions){
			  res.locals.questionData = questions;
			  next();
		  })
		  .catch(console.error);
  },
	formatData: function (req, res, next) {
		dirtyData = res.locals.questionData;
		cleanData = res.locals.questionData.results.map(function (piece){
			return {
				'question': piece.question,
				'right': piece.correct_answer,
				'wrong': piece.incorrect_answers
			}
		});
		res.locals.questionData = cleanData;
		next();
	}
};
module.exports = dataController;
