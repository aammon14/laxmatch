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
// import CoachPortal from "./components/CoachPortal";
import Message from "./components/Message";
import TokenService from "./services/TokenService";
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
  }

  componentDidMount() {
    this.findUsers();
    this.findCoachInfo();
    this.findPlayerInfo();
    this.getMessages();
    console.log("in componentDidMount, this.state: ", this.state);
  }

  login(data) {
    axios("http://localhost:3000/users/login", {
      method: "POST",
      data
    })
      .then(resp => {
        console.log("login resp ", resp);
        TokenService.save(resp.data.token);
        this.setState({ user: resp.data.user, logged: true});
        console.log("state is ", this.state);
        this.findPlayerInfo;
        this.findCoachInfo;
        this.findUsers;
        console.log("in login, user: ", this.state);
      })
      .catch(err => console.log(`err: ${err}`));
  }

  checkLogin() {
    axios("http://localhost:3000/isLoggedIn", {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`
      }
    })
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  }

  logout(ev) {
    ev.preventDefault();
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
        console.log("in signup, this.state: ", this.state);
        this.findUsers
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
        this.findPlayerInfo;
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
        this.findCoachInfo;
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
        //console.log("in findUsers, users: ", this.state.users);
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
        console.log("in findCoachInfo, coachInfo: ", this.state.coachInfo);
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
        console.log("in findPlayerInfo, playerInfo: ", this.state.playerInfo);
      })
      .catch(err => console.log(`err: ${err}`));
  }


  updateCoach(data) {
    //console.log('in updateCoach, coach is ', this.state.coachInfo);
    axios(`http://localhost:3000/users/${this.state.user.id}/coach`, {
      method: "PUT",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({ coachInfo: resp.data.coachInfo });
      this.findCoachInfo();
    })
    .catch(err => console.log(`err: ${err}`));
  }

  updatePlayer(data) {
    //console.log('in updatePlayer, player is ', this.state.playerInfo);
    axios(`http://localhost:3000/users/${this.state.user.id}/player`, {
      method: "PUT",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({ playerInfo: resp.data.playerInfo });
      console.log('in updatePlayer, playerInfo is', this.state.playerInfo);
      this.findPlayerInfo;
    })
    .catch(err => console.log(`err: ${err}`));
  }

  getMessages() {
    axios(`http://localhost:3000/messages`, {
      method: "GET"
    })
      .then(resp => {
        console.log('in getMessages, resp.data is: ', resp.data);
        this.setState({
          messages: resp.data
        });
        console.log('in get messages, this.state.messages: ', this.state.messages)
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
                    <Nav user={this.state.user} />
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
                    <Nav user={this.state.user} />
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
                    <Nav user={this.state.user} />
                    <Login {...props} submit={this.login} />
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
                    <Nav user={this.state.user} />
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
                  </div>
                );
              }}
            />
            <Route
              exact path="/coaches"
              render={props => {
                return (
                  <div>
                    <Nav user={this.state.user} />
                    <CoachList
                      {...props}
                      users={this.state.users}
                      coachInfo={this.state.coachInfo}
                      dataLoaded={this.state.loadedInitialData}
                    />
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
                    <Nav user={this.state.user} />
                    <Coach
                      {...props}
                      users={this.state.users}
                      user={this.state.user}
                      coachInfo={this.state.coachInfo}
                      dataLoaded={this.state.loadedInitialData}
                    />
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
                    <Nav user={this.state.user} />
                    <PlayerForm
                      {...props}
                      user={this.state.user}
                      create={this.createPlayerInfo}
                    />
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
                    <Nav user={this.state.user} />
                    <CoachForm
                      {...props}
                      user={this.state.user}
                      create={this.createCoachInfo}
                    />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/Message"
              render={props => {
                return (
                  <div>
                    <Nav user={this.state.user} />
                    <Message
                      {...props}
                      user={this.state.user}
                      coachInfo={this.state.coachInfo}
                      playerInfo={this.state.playerInfo}
                      logged={this.state.logged}
                      logout={this.logout}
                    />
                  </div>
                )
              }}
            />
          </Switch>
        </BrowserRouter>

        <div>
          <p>
            <button onClick={this.logout}>Logout</button>
          </p>
        </div>
      </div>
    );
    } return <div>LOADING...</div>;
  }
}

export default App;