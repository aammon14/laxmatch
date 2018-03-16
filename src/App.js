import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import CoachList from "./components/CoachList";
import Coach from "./components/Coach"
import PlayerForm from "./components/PlayerForm"
import CoachForm from "./components/CoachForm"
import TokenService from "./services/TokenService";
import Footer from "./components/Footer"
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedInitialData: false,
      user: {},
      logged: false,
      users: [],
      coachInfo: {},
      playerInfo: {},
      messages: {}
    };
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.findUsers = this.findUsers.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.updateCoach = this.updateCoach.bind(this);
    this.findCoachInfo = this.findCoachInfo.bind(this);
    this.findPlayerInfo = this.findPlayerInfo.bind(this);
    this.createPlayerInfo = this.createPlayerInfo.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount() {
    this.findUsers();
    this.findCoachInfo();
    this.findPlayerInfo();
    this.getMessages();
    this.checkLogin();
    console.log("in componentDidMount, this.state: ", this.state);
  }

  login(data) {
    axios("http://localhost:3000/users/login", {
      method: "POST",
      data
    })
      .then(resp => {
        TokenService.save(resp.data.token);
        this.setState({ user: resp.data.user, logged: true});
      })
      .catch(err => console.log(`err: ${err}`));
  }

  checkLogin() {
    axios('http://localhost:3000/isLoggedIn', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => {
      console.log("in checkLogin, resp is ", resp);
      if (resp.statusText === "OK") {
        this.setState({logged: true, user: resp.data});
      }
    })
    .catch(err => console.log(err));
  }

  logout() {

    this.setState({ user: {}, logged: false });
    TokenService.destroy();
  }

  signup(data) {
    console.log("in app.js signup, data is ", data);
    axios("http://localhost:3000/users/", {
      method: "POST",
      data
    })
      .then(resp => {
        TokenService.save(resp.data.token);
        this.setState({ user: resp.data.user });
      })
      .catch(err => console.log(`err: ${err}`));
  }

  createPlayerInfo(data) {
    axios(`http://localhost:3000/users/:id/player`, {
      method: "POST",
      data
    })
      .then(resp => {
        TokenService.save(resp.data.token);
        this.findPlayerInfo();
      })
      .catch(err => console.log(`err: ${err}`));
  }

  createCoachInfo(data) {
    axios(`http://localhost:3000/users/:id/coach`, {
      method: "POST",
      data
    })
      .then(resp => {
        TokenService.save(resp.data.token);
        this.findCoachInfo();
      })
      .catch(err => console.log(`err: ${err}`));
  }


  findUsers() {
    axios("http://localhost:3000/users", {
      method: "GET"
    })
      .then(resp => {
        this.setState({ 
          users: resp.data
        });
      })
      .catch(err => console.log(`err: ${err}`));
  }

  findCoachInfo() {
    axios(`http://localhost:3000/users/${this.state.user.id}/coaches`, {
      method: "GET"
    })
      .then(resp => {
        this.setState({ 
          coachInfo: resp.data,
          loadedInitialData: true
        });
      })
      .catch(err => console.log(`err: ${err}`));
  }

  findPlayerInfo() {
    console.log('in findPlayerInfo, user is ', this.state.user);
    axios(`http://localhost:3000/users/${this.state.user.id}/players`, {
      method: "GET"
    })
      .then(resp => {
        console.log("in findPlayerInfo, resp is ", resp.data);
        this.setState({ 
          playerInfo: resp.data,
          loadedInitialData: true 
        });
      })
      .catch(err => console.log(`err: ${err}`));
  }


  updateCoach(data) {
    axios(`http://localhost:3000/users/${this.state.user.id}/coach`, {
      method: "PUT",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({ coachInfo: resp.data.coachInfo });
    })
    .catch(err => console.log(`err: ${err}`));
  }

  updatePlayer(data) {
    axios(`http://localhost:3000/users/${this.state.user.id}/player`, {
      method: "PUT",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({ playerInfo: resp.data.playerInfo });
    })
    .catch(err => console.log(`err: ${err}`));
  }

  getMessages() {
    axios(`http://localhost:3000/messages`, {
      method: "GET"
    })
      .then(resp => {
        this.setState({
          messages: resp.data
        });
      })
      .catch(err => console.log(`err: ${err}`));
  }

  createMessage(data) {
    axios(`http://localhost:3000/messages`, {
      method: "POST",
      data
    })
      .then(resp => {
        TokenService.save(resp.data.token);
      })
      .catch(err => console.log(`err: ${err}`));
  }


  render() {
    if (this.state.loadedInitialData === true) {
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
                    <Nav user={this.state.user} onClick={this.logout} />
                    <Home />
                    <Footer />
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
                    <Nav user={this.state.user} onClick={this.logout} />
                    <Signup {...props} submit={this.signup} />
                    <Footer />
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
                    <Nav user={this.state.user} onClick={this.logout} />
                    <Login {...props} submit={this.login} />
                    <Footer />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/profile"
              render={props => {
                return (
                  <div>
                    <Nav user={this.state.user} onClick={this.logout} />
                    <Profile
                      {...props}
                      user={this.state.user}
                      coachInfo={this.state.coachInfo}
                      playerInfo={this.state.playerInfo}
                      logged={this.state.logged}
                      logout={this.logout}
                      update={this.updateUser}
                      updatePlayer={this.updatePlayer}
                      updateCoach={this.updateCoach}
                      findCoachInfo={this.findCoachInfo}
                      findPlayerInfo={this.findPlayerInfo}
                      messages={this.state.messages}
                    />
                    <Footer />
                  </div>
                );
              }}
            />
            <Route
              exact path="/coaches"
              render={props => {
                return (
                  <div>
                    <Nav user={this.state.user} onClick={this.logout} />
                    <CoachList
                      {...props}
                      users={this.state.users}
                      coachInfo={this.state.coachInfo}
                      dataLoaded={this.state.loadedInitialData}
                    />
                    <Footer />
                  </div>
                )
              }}
            />
            <Route
              exact
              path="/coaches/:id"
              render={props => {
                return (
                  <div>
                    <Nav user={this.state.user} onClick={this.logout} />
                    <Coach
                      {...props}
                      users={this.state.users}
                      user={this.state.user}
                      coachInfo={this.state.coachInfo}
                      playerInfo={this.state.playerInfo}
                      dataLoaded={this.state.loadedInitialData}
                      createMessage={this.createMessage}
                    />
                    <Footer />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/PlayerForm"
              render={props => {
                return (
                  <div>
                    <Nav user={this.state.user} onClick={this.logout} />
                    <PlayerForm
                      {...props}
                      user={this.state.user}
                      create={this.createPlayerInfo}
                    />
                    <Footer />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/CoachForm"
              render={props => {
                return (
                  <div>
                    <Nav user={this.state.user} onClick={this.logout} />
                    <CoachForm
                      {...props}
                      user={this.state.user}
                      create={this.createCoachInfo}
                    />
                    <Footer />
                  </div>
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
      );
    } return <div>LOADING...</div>;
  }
}

export default App;