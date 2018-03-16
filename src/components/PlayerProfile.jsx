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
        <div className='coachProfile'>
          <h1>Hello {this.props.user.name}, welcome to your account!</h1>
          <Link to="/coaches">
            <button className="coachesButton">View Coaches</button>
          </Link>
            
          {this.state.playerInfo.map((info, i) => {
            if (this.props.user.id === info.user_id) {
              return (
                <div className='coachInfo' key={i}>
                  <p><b>About me:</b> {info.bio}</p>
                  <h4>Location(zip): {info.zip_code}</h4>
                  <h4>Age: {info.age} years old</h4>
                </div>
              )
            }
          })}
          <button className="submitButton" onClick={this.editProfile}>
            Edit Profile
          </button>
          {updateProfile}
          <Link to='/PlayerForm'><button className="submitButton">Create</button></Link> 
          
          
        </div>
      );
  }
}