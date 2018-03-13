import React, { Component } from 'react'

export default class CoachList extends Component {
  constructor(props) {
    super(props);
    console.log('in coachList constructor, this.props: ', this.props)
  }
  render() {
    var coaches = (this.props.users.role === "coach")
    console.log('coaches:', coaches)
    return (
      <div>
        <h1>LaxMatch Coaches</h1>

      </div>
    )
  }
}