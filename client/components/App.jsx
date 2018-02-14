import React, { Component } from 'react';
import Login from './Login.jsx';
import Question from './Question.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.questions = null;
    this.state = {
      user: null,
      question: 0,
      gameover: false,
      seconds: 10,
      score: 0,
    };

    // Variable to store interval
    this.interval = null;

    // Bindings 
    this.setIntialState = this.setIntialState.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.startGame = this.startGame.bind(this);
    this.tick = this.tick.bind(this);
    this.clickAnswer = this.clickAnswer.bind(this);
    this.gameover = this.gameover.bind(this);
  }

  componentDidMount() {
    // Make call to server for trivia questions
    const that = this;
    axios.get('/getData').then((res) => {
      that.questions = res.data;
    });
  }

  // Reset state
  setIntialState() {
    this.setState({
      user: null,
      question: 0,
      gameover: false,
      seconds: 10,
    });
  }

  login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    this.setState({ user: 'not null' });
    // axios.post('/login', { username, password }).then(res => {
    //   console.log(res);
    // })
  }

  signup() {
    const username = document.getElementById('username').innerHTML;
    const password = document.getElementById('password').innerHTML;
    this.setState({ user: 'not null' });
    // axios.post('/login', { username, password }).then(res => {
    //   console.log(res);
    // })
  }

  // Timer function, fires every 1 second in a setInterval
  tick() {
    if (this.state.seconds === 1) {
      const question = this.state.question + 1;
      if (question > 10) {
        clearInterval();
        this.setState({ gameover: true });
      } else {
        this.setState({
          question,
          seconds: 10,
        });
      }
    } else {
      const seconds = this.state.seconds - 1;
      this.setState({ seconds });
    }
  }

  startGame() {
    this.setState({ gameover: false, question: 1, score: 0 });
    // Timer for each question
    const tick = () => { this.tick(); };
    this.interval = setInterval(tick, 1000);
  }

  // Handle question selection
  clickAnswer(correct) {
    if (this.state.question === 10) return this.gameover();
    clearInterval(this.interval);
    setTimeout(() => {
      let { score, question } = this.state;
      question += 1;
      if (correct) score += 1;
      this.setState({
        question,
        score,
        seconds: 10,
      });
      const tick = () => { this.tick(); };
      this.interval = setInterval(tick, 1000);
    }, 1000);
  }

  gameover() {
    clearInterval(this.interval);
    setTimeout(() => {
      this.setState({ gameover: true });
    }, 1000);
  }

  render() {
    let content = <div id="login"><Login login={this.login} signup={this.signup} /></div>;
    if (this.state.gameover) {
      content = (
        <div id="game-over">
          <div className="header">
            <h1>Gameover!</h1>
          </div>
          <div className="start-button">
            <RaisedButton onClick={this.startGame} label="Play Again" backgroundColor="#7CFC00" labelColor="#FFFFFF" labelStyle={{ fontSize: 32 }} style={{ height: 120, width: 300 }} />
          </div>
        </div>
      );
    } else if (this.state.user !== null) {
      if (this.state.question === 0) {
        content = (
          <div id="game">
            <div className="header">
              <h1>Trivia Time!</h1>
            </div>
            <div className="start-button">
              <RaisedButton onClick={this.startGame} label="Start Game" backgroundColor="#7CFC00" labelColor="#FFFFFF" labelStyle={{ fontSize: 32 }} style={{ height: 120, width: 300 }} />
            </div>
          </div>
        );
      } else {
        content = (
          <div id="game">
            <div className="header">
              <h1>Trivia Time!</h1>
              <h2>Question {this.state.question}/10</h2>
              <h3>Score {this.state.score}/10</h3>
            </div>
            <Question question={this.questions[this.state.question - 1]} number={this.state.question} clickAnswer={this.clickAnswer} />
            <div id="timer">
              {this.state.seconds}
            </div>
          </div>
        );
      }
    }
    return (
      <div>
        { content }
      </div>
    );
  }
}

export default App;
