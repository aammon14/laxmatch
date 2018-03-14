import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditUser from './EditUser';
import EditPlayer from './EditPlayer';


export default class PlayerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
    this.editProfile = this.editProfile.bind(this)
  }

  editProfile() {
    this.setState(prevState => {
      const nextState = { ...prevState, editing: !prevState.editing };
      return nextState;
    });
  }

  render() {
    let updateProfile = null;
    if (this.state.editing) {
      updateProfile = (
        <div>
          <EditPlayer submit={this.props.updatePlayer} user={this.props.user} />
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

        <h3>Location (zip): {this.props.playerInfo.zip_code}</h3>
        <h3>Age: {this.props.playerInfo.age} years old</h3>
        <p>About me: {this.props.playerInfo.bio}</p>
        <Link to="/coaches">
          <button>View Coaches</button>
        </Link>
      </div>
    );
  }
}