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
    };

    // Variable to store interval
    this.interval = null;

    // Bindings 
    this.setIntialState = this.setIntialState.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.startGame = this.startGame.bind(this);
    this.tick = this.tick.bind(this);
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
    let that = this;
	  axios.post('/login', {
		  data: {
			  username: username,
			  password: password
		  }
	  })
		  .then(function (response) {
			  if (response.data === 'valid user') {
				  that.setState({user: username});
			  } else {
			    console.log('invalid user');
			  }
		  })
  }

  signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
		let that = this;
    axios.post('/signup', {
    	data: {
    		username: username,
    		password: password
	    }
    }).then(res => {
      if (res.data === "User has been saved") {
	      that.setState({user: username});
      } else {
      	console.log(res.data);
      }
    })
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
      this.setState({ seconds, next: false });
    }
  }

  startGame() {
    this.setState({ question: 1 });
    // Timer for each question
    const tick = () => { this.tick(); };
    this.interval = setInterval(tick, 1000);
    console.log('interval', this.interval);
  }

  // Handle question selection
  clickAnswer() {
    console.log('interval', this.interval);
    clearInterval(this.interval);
    const that = this;
    setTimeout(() => {
      const question = that.state.question + 1;
      that.setState({
        question, 
        seconds: 10,
      });
      const tick = () => { that.tick(); };
      that.interval = setInterval(tick, 1000);
    }, 1500);
  }

  render() {
    let content = <div id="login"><Login login={this.login} signup={this.signup} /></div>;
    if (this.state.gameover) {
      content = <h1>Gameover!</h1>;
    } else if (this.state.user !== null) {
      if (this.state.question === 0) {
        content = (
          <div id="game">
            <div id="header">
              <h1>Trivia Time!</h1>
            </div>
            <div id="start-button">
              <RaisedButton onClick={this.startGame} label="Start Game" backgroundColor="#7CFC00" labelColor="#FFFFFF" labelStyle={{ fontSize: 32 }} style={{ height: 120, width: 300 }} />
            </div>
          </div>
        );
      } else {
        content = (
          <div id="game">
            <div id="header">
              <h1>Trivia Time!</h1>
              <h2>Question {this.state.question}/10</h2>
            </div>
            <Question question={this.questions[this.state.question - 1]} next={this.state.next} clickAnswer={this.clickAnswer} />
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
