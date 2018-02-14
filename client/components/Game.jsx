import React, { Component } from 'react';
import Question from './Question.jsx';
import axios from 'axios';


const Game = (props) => {
  return (
    <div id="game">
      <div id="header"><h1>Trivia Time!</h1></div>
      <Question />
    </div>
  );
};

export default Game;
