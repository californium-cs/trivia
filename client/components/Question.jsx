import React, { Component } from 'react';

class Question extends Component {
  componentDidUpdate() {
    // Do stuff
  }
  
  render() {
    const test = [1, 2, 3]
    const correctIndex = Math.floor(Math.random() * 4);
    test.splice(correctIndex, 0, 100);
    console.log(test);
    return (
      <h2>Hello</h2>
    );
  }
}

export default Question;