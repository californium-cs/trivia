import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App.jsx';

class Main extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    );
  }
};

ReactDOM.render(<Main />, document.getElementById('root'));
