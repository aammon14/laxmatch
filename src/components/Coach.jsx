import React, { Component } from "react";

class Coach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coach: {},
      user: this.props.user,
      message: ""
    };
  }
  render() {
    return (
      <div>
        <div>
          <h1>{this.state.coach.name}</h1>
          <p>{this.state.coach.bio}</p>
          <p>{this.state.coach.price}</p>
          <p>{this.state.coach.zip_code}</p>
          <img src={this.state.coach.image} />
        </div>
      </div>
    );
  }
}
export default Coach;
