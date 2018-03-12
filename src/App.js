import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import CoachList from "./componenets/CoachList";
// import CoachPortal from "./components/CoachPortal";
// import PlayerProfile from "./components/PlayerProfile";
// import Message from "./components/Message";
import TokenService from "./services/TokenService";

class App extends Component {
  signup(data) {
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
      })
      .catch(err => console.log(`err: ${err}`));
  }

  logout(ev) {
    ev.preventDefault();
    TokenService.destroy();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/signup"
              component={props => (
                <Signup {...props} submit={this.signup.bind(this)} />
              )}
            />
            <Route
              exact
              path="/login"
              component={props => (
                <Login {...props} submit={this.login.bind(this)} />
              )}
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