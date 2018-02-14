import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


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
    const answers = [...this.props.question.wrong];
    const index = Math.floor(Math.random() * 4);
    answers.splice(index, 0, this.props.question.right);
    this.answers = answers;
    
    // Index of the correct answer in the answers array
    this.index = index;
  
    // Bind click handler to this
    this.click = this.click.bind(this);
  }

  click(id) {
    if (id === this.index) {
      this.backgroundColor[id] = '#7CFC00';
    } else {
      this.backgroundColor[id] = '#DC143C';
      this.backgroundColor[this.index] = '#7CFC00';
    }
    this.props.clickAnswer();
  }

  render() {
    // If a new question is supplied updated properties
    if (this.question !== this.props.question.question) {
      this.question = this.props.question.question;
      const answers = [...this.props.question.wrong];
      const index = Math.floor(Math.random() * 4);
      answers.splice(index, 0, this.props.question.right);
      this.answers = answers;

      // Reset colors from last question
      this.backgroundColor = ['', '', '', ''];
    }
    return (
      <div id="question-box">
        <h3 id="question">{this.question}</h3>
        <RaisedButton onClick={() => { this.click(0); }} backgroundColor={this.backgroundColor[0]} label={this.answers[0]} style={{ margin: 10 }} />
        <RaisedButton onClick={() => { this.click(1); }} backgroundColor={this.backgroundColor[1]} label={this.answers[1]} style={{ margin: 10 }} />
        <RaisedButton onClick={() => { this.click(2); }} backgroundColor={this.backgroundColor[2]} label={this.answers[2]} style={{ margin: 10 }} />
        <RaisedButton onClick={() => { this.click(3); }} backgroundColor={this.backgroundColor[3]} label={this.answers[3]} style={{ margin: 10 }} />
      </div>
    );
  }
}

export default Question;
