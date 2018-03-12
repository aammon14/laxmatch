import React, { Component } from "react";

export default class CoachProfile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hello Coach {this.props.user.name}, welcome to your account!</h1>
        <h3>Zip Code: {this.props.coachInfo.zip_code}</h3>
        <h3>Price: ${this.props.coachInfo.price} per hour</h3>
        <p>About me: {this.props.coachInfo.bio}</p>
        <img src={this.props.coachInfo.image} />
      </div>
    );
  }
}