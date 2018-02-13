import React, { Component } from 'react';
import Login from './Login.jsx';
import Game from './Game.jsx';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.questions = [];
    this.answers = [];
    this.state = {
      user: null,
      question: 0,
      // seconds: 10,
    };
    this.setIntialState = this.setIntialState.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    // Make call to server for questions
  }

  setIntialState() {
    this.setState({
      user: null,
      question: 0,
      // seconds: 10,
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

  render() {
    let content = (
      <div id="login">
        <Login login={this.login} signup={this.signup} />
      </div>
    );
    if (this.state.user !== null) {
      content = (
        <div>
          <Game question={this.questions[this.state.question]} />
        </div>
      );
    }
    return (
      <div>
        { content }
      </div>
    );
  }
}

export default App;
