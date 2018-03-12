import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import TokenService from './services/TokenService';

class App extends Component {
  signup(data) {
    axios('http://localhost:3000/users/', {
      method: "POST",
      data
    }).then(resp => {
      TokenService.save(resp.data.token)
    })
    .catch(err => console.log(`err: ${err}`));
  }

  login(data) {
    axios('http://localhost:3000/users/login', {
      method: "POST",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  // authClick(ev) {
  //   ev.preventDefault();
  //   axios('http://localhost:3000/users', {
  //     headers: {
  //       Authorization: `Bearer ${TokenService.read()}`,
  //     },
  //   }).then(resp => console.log(resp))
  //   .catch(err => console.log(err));
  // }

  logout(ev) {
    ev.preventDefault();
    TokenService.destroy();
  }

  checkLogin() {
    axios('http://localhost:3000/isLoggedIn', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => console.log(resp))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div>
          <p><button onClick={this.checkLogin.bind(this)}>Check If Logged In</button></p>
          <p><button onClick={this.logout.bind(this)}>Logout</button></p>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={(props) => (
                <Signup {...props} submit={this.signup.bind(this)} />
            )} />
          <Route exact path="/login" component={(props) => (
            <Login {...props} submit={this.login.bind(this)} />
          )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
