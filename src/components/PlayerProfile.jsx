import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PlayerProfile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hello {this.props.user.name}, welcome to your account!</h1>
        <h3>Location (zip): {this.props.playerInfo.zip_code}</h3>
        <h3>Age: {this.props.playerInfo.age} years old</h3>
        <p>About me: {this.props.playerInfo.bio}</p>
        <Link to="/">
          <button>View Coaches</button>
        </Link>
      </div>
    );
  }
}