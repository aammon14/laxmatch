import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Nav from "./components/Nav";
import Profile from "./components/Profile"
// import CoachList from "./componenets/CoachList";
// import CoachPortal from "./components/CoachPortal";
import PlayerProfile from "./components/PlayerProfile";
// import Message from "./components/Message";
import TokenService from "./services/TokenService";
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      logged: false,
      users: []
    }
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.findUsers = this.findUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.findUsers();
    console.log('in componentDidMount, this.state: ', this.state)
  }

  signup(data) {
    console.log("in app.js signup, data is ", data);
    axios("http://localhost:3000/users/", {
      method: "POST",
      data
    })
      .then(resp => {
        TokenService.save(resp.data.token);
      })
      .catch(err => console.log(`err: ${err}`));
  }

  login(data) {
    axios("http://localhost:3000/users/login", {
      method: "POST",
      data
    })
      .then(resp => {
        TokenService.save(resp.data.token);
        this.setState({ user: resp.data.user, logged: true })
        console.log('in login, user: ', this.state)
      })
      .catch(err => console.log(`err: ${err}`));
  }

  updateUser(data) {
    console.log('in updateUser, user is: ', this.state);
    axios("http://localhost:3000/users/login", {
      method: "PUT",
      data
    }).then(resp => {
        TokenService.save(resp.data.token);
        this.setState({ user: resp.data.user })
      })
      .catch(err => console.log(`err: ${err}`));
  }

  logout(ev) {
    ev.preventDefault();
    this.setState({ user: {}, logged: false })
    TokenService.destroy();
  }

  findUsers() {
    axios('http://localhost:3000/users', {
      method: "GET"
    }).then(resp => {
      this.setState({ users: resp.data.users });
      console.log("in findUsers, users: ", this.state.users);
    })
    .catch(err => console.log(`err: ${err}`));
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
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={props => {
                return (
                  <div>
                    <Nav />
                    <Home />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/signup"
              render={props => {
                return (
                  <div>
                    <Nav />
                    <Signup {...props} submit={this.signup} />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/login"
              render={props => {
                return (
                  <div>
                    <Nav />
                    <Login {...props} submit={this.login} />
                  </div>
                )
              }}
            />
            <Route
              exact path="/profile"
              render={props => {
                return (
                  <div>
                    <Nav />
                    <Profile {...props} user={this.state.user} logged={this.state.logged} logout={this.logout} change={this.updateUser} />
                  </div>
                )
              }}
            />
          </Switch>
        </BrowserRouter>

        <div>
          <p>
            <button onClick={this.logout.bind(this)}>Logout</button>
          </p>
        </div>
      </div>
    );
  }
}

export default App;