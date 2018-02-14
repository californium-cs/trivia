import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import utf8 from 'utf8';

class Question extends Component {
  constructor(props) {
    super(props);

    // Store button background color as a property
    // so it can be updated dynamically
    this.backgroundColor = ['', '', '', ''];

    // Store question
    this.question = this.props.question.question;

    // Store answers in an array with right answer
    // randomly placed
    let answers = [...this.props.question.wrong];
    let index = Math.floor(Math.random() * 4);
    answers.splice(index, 0, this.props.question.right);
    this.answers = answers;
    
    // Index of the correct answer in the answers array
    this.index = index;
  
    // Bind click handler to this
    this.click = this.click.bind(this);
  }

  click(id) {
    let correct = false;
    if (id === this.index) {
      this.backgroundColor[id] = '#7CFC00';
      correct = true;
    } else {
      this.backgroundColor[id] = '#DC143C';
      this.backgroundColor[this.index] = '#7CFC00';
    }
    setTimeout(() => {
      this.props.clickAnswer(correct);
    }, 1000);
  }

  render() {
    // If a new question is supplied updated properties
    if (this.props.number <= 10) {
      if (this.question !== this.props.question.question) {
        this.question = this.props.question.question;
        const answers = [...this.props.question.wrong];
        const index = Math.floor(Math.random() * 4);
        answers.splice(index, 0, this.props.question.right);
        this.answers = answers;
        this.index = index;

        // Reset colors from last question
        this.backgroundColor = ['', '', '', ''];
      }
    }
    return (
      <div id="question-box">
        <h3 id="question">{decodeURIComponent(this.question)}</h3>
        <RaisedButton onClick={() => { this.click(0); }} backgroundColor={this.backgroundColor[0]} label={decodeURIComponent(this.answers[0])} style={{ margin: 10, overflow: "hidden" }} />
        <RaisedButton onClick={() => { this.click(1); }} backgroundColor={this.backgroundColor[1]} label={decodeURIComponent(this.answers[1])} style={{ margin: 10, overflow: "hidden" }} />
        <RaisedButton onClick={() => { this.click(2); }} backgroundColor={this.backgroundColor[2]} label={decodeURIComponent(this.answers[2])} style={{ margin: 10, overflow: "hidden" }} />
        <RaisedButton onClick={() => { this.click(3); }} backgroundColor={this.backgroundColor[3]} label={decodeURIComponent(this.answers[3])} style={{ margin: 10, overflow: "hidden" }} />
      </div>
    );
  }
}

export default Question;
