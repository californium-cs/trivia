import React, { Component } from 'react';
import Question from './Question.jsx';
import axios from 'axios';

class Game extends Component {
  render() {
    return(
      <div id="game">
        <div id="header">
          <h1>Trivia Time!</h1>
          <Question />
        </div>
      </div>
    );
  }
}


export default Game;