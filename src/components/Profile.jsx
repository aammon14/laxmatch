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
        <PlayerProfile 
          updatePlayer={this.props.updatePlayer} 
          user={this.props.user} 
          playerInfo={this.props.playerInfo}
          findPlayerInfo={this.props.findPlayerInfo} 
        />
      )
    }
    else if (this.props.user.role === 'coach') {
      return (
        <CoachProfile 
          updateCoach={this.props.updateCoach}
          user={this.props.user} 
          coachInfo={this.props.coachInfo} 
          findCoachInfo={this.props.findCoachInfo}
          messages={this.props.messages}
        />
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