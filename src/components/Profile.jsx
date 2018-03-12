import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerProfile from './PlayerProfile';
import CoachProfile from './CoachProfile';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    console.log('in profile constructor: ', this.props)
  }
  render() {
    if (this.props.user.role === 'player') {
      return (
        <PlayerProfile user={this.props.user} logout={this.logout} change={this.updateUser}/>
      )
    }
    else if (this.props.user.role === 'coach') {
      return (
        <CoachProfile user={this.props.user} logout={this.logout} change={this.updateUser}/>
      )
    }
    else {
      return (
        <div className="app-container">
          <h2>Please Log in to view your profile</h2>
          <Link to="/login"><button>Login</button></Link>
        </div>
      )
    }
  }
}