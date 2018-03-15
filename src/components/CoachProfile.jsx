import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditUser from './EditUser';
import EditCoach from './EditCoach';


export default class CoachProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      coachInfo: this.props.coachInfo,
      messages: this.props.messages
    }
    this.editProfile = this.editProfile.bind(this)
  }

  componentDidMount() {
    this.props.findCoachInfo();
    console.log('in CoachProfile compDidMount, CachInfo: ', this.props.coachInfo)
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
          <EditCoach submit={this.props.updateCoach} user={this.props.user} findCoachInfo={this.props.findCoachInfo} />
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
        <Link to='/CoachForm'><button>Create</button></Link>
      
        {this.state.coachInfo.map((info, i) => {
          if (this.props.user.id === info.user_id) {
            return (
              <div key={i}>
                <h3>Zip Code: {info.zip_code}</h3>
                <h3>Price: ${info.price} per hour</h3>
                <p>About me: {info.bio}</p>
                <img src={info.image} />
              
              {this.state.messages.map((msg, j) => {
                if (info.id === msg.coach_id) {
                  return (
                    <h3 key={j}>Message from player_id {msg.player_id}: {msg.body}</h3>
                  )
                }
              })}
              </div>
            )
          }        
        })}

        
        
        <Link to="/coaches">
          <button>View Coaches</button>
        </Link>
      </div>
    );
  }
}

