import React, { Component } from "react";

class Coach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coach: {},
      user: this.props.user,
      message: ""
    };
    console.log('in coach comp, this.props', this.props)
    console.log('in coach comp, this.state', this.state)
  }
  render() {
    return (
      <div>
        <div>
          <h1>Message Coach</h1>
          <h1>{this.props.coachInfo.name}</h1>
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
