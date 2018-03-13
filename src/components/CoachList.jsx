import React, { Component } from 'react'

export default class CoachList extends Component {
  constructor(props) {
    super(props);
    console.log('in coachList constructor, this.props: ', this.props)
  }
  render() {
    this.props.users.map(role => {

    })
    return (
      <div>
        <h1>LaxMatch Coaches</h1>
        {this.props.users.map((coach, i) => {
          if (coach.role === 'coach') {
            return (
              <div key={i}>
                <h1>{coach.name}</h1>
              </div>
            )
          }
        })}
      </div>
    )
  }
}