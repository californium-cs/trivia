import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  render() {
    return (
        <div id="login-box">
          <TextField 
            id="username"
            floatingLabelText="username"
          />
          <TextField
            id="password"
            type="password"
            floatingLabelText="password"
          />
          <div id="login-buttons">
            <RaisedButton
              label="Login"
              labelColor="gray"
              onClick={this.props.login}
            />
            <RaisedButton
              label="Sign up"
              labelColor="gray"
              onClick={this.props.signup}
            />
          </div>
        </div>
    );
  };
}
export default Login;
