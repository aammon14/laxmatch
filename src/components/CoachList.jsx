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
        <div className='coachList'>
          <h1>Lacrosse Coaches</h1>
          {this.props.users.map((coach, i) => {
            if (coach.role === 'coach') {
              return (
                <div className='coachListItem' key={i}>
                    <h1>{coach.name}</h1>
                    {this.props.coachInfo.map((info, j) => {
                      if (coach.id === info.user_id) {
                      return (
                        <div key={j} className='textImage'>
                          <div className='coachListText'>
                            <p>About: {info.bio}</p>
                            <p>Location (zip): {info.zip_code}</p>
                            <Link to={`./coaches/${info.user_id}`}>
                              <button className="coachesButton">Book a Lesson!</button>
                            </Link>
                          </div>
                          <div className='imageDiv'>
                            <img src={info.image} alt='coach' className='coachListImage'  />
                          </div>
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