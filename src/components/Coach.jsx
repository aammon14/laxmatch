import React, { Component } from "react";

class Coach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coach: {},
      user: this.props.user,
      users: this.props.users,
      message: ""
    };
    console.log('in coach comp, this.props', this.props)
    console.log('in coach comp, this.state', this.state)
    console.log('this.props.match.params.id: ', this.props.match.params.id)
  }
  // componentDidMount() {

  // }
  render() {
    const coach = this.props.users.map((person, i) => {
      console.log('in coach render, person: ', person)
      if (person.id == this.props.match.params.id) {
        return (
          <div>
            <h1>Coach {person.name}</h1>
          </div>
        )
      }
    })
    return <div>{coach}</div>
  }
}
export default Coach;
