import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CoachList extends Component {
  constructor(props) {
    super(props);
    console.log('in coachList constructor, this.props: ', this.props)
  }
  render(){
    if (this.props.dataLoaded) {
      return (
        <div>
          <h1>LaxMatch Coaches</h1>
          {this.props.users.map((coach, i) => {
            if (coach.role === 'coach') {
              return (
                <div key={i}>
                  <h1>{coach.name}</h1>
                  {this.props.coachInfo.map((info, j) => {
                    if (coach.id === info.user_id) {
                    return (
                      <div key={j}>
                        <p>coach id: {info.id}, user_id: {info.user_id}</p>
                        <p>{info.bio}</p>
                        <p>Zip code: {info.zip_code}</p>
                        <Link to={`./coaches/${info.id}`}>
                          <button>Book a Lesson!</button>
                        </Link>
                      </div>
                    )}
                  })}
                </div>
              )
            }
          })}
        </div>
      )
    } return <div>LOADING...</div>;
  }
}