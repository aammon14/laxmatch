import React, { Component } from "react";
import { Link } from "react-router-dom";
//import EditUser from './EditUser';
import EditPlayer from './EditPlayer';
//import axios from 'axios';


export default class PlayerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      playerInfo: this.props.playerInfo
    }
    this.editProfile = this.editProfile.bind(this);
  }

  componentDidMount() {
    this.props.findPlayerInfo();
    console.log("in PlayerProfile componentDidMount, playerInfo is ", this.props.playerInfo);
  }

  editProfile() {
    this.setState(prevState => {
      const nextState = { ...prevState, editing: !prevState.editing };
      return nextState;
    });
  }

  render() {
    const player = this.state.playerInfo;
    console.log('player is ', player);
    let updateProfile = null;
    if (this.state.editing) {
      updateProfile = (
        <div>
          <EditPlayer submit={this.props.updatePlayer} user={this.props.user} findPlayerInfo={this.props.findPlayerInfo} />
        </div>
      );
    }
      return (
        <div>
          <h1>Hello {this.props.user.name}, welcome to your account!</h1>
          <button className="profile-button" onClick={this.editProfile}>
            Edit Profile
          </button>
          {updateProfile}
          <Link to='/PlayerForm'><button>Create</button></Link>
            
          {this.state.playerInfo.map((info, i) => {
            if (this.props.user.id === info.user_id) {
              return (
                <div key={i}>
                  <h3>Zip Code: {info.zip_code}</h3>
                  <h3>Age: {info.age} years old</h3>
                  <p>About me: {info.bio}</p>
                </div>
              )
            }
          })}
            
          
          <Link to="/coaches">
            <button>View Coaches</button>
          </Link>
        </div>
      );
  }
}