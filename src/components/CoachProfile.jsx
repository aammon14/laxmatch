import React, { Component } from "react";
import { Link } from "react-router-dom";
//import EditUser from './EditUser';
import EditCoach from './EditCoach';


export default class CoachProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
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
    let userId = this.props.user.id
    let info = this.props.coachInfo.filter(function(info) {
        return info.user_id === userId;
        
      })
    let updateProfile = null;
    if (this.state.editing) {
      updateProfile = (
        <div>
          <EditCoach submit={this.props.updateCoach} user={this.props.user} findCoachInfo={this.props.findCoachInfo} />
        </div>
      );
    }
    return (
      <div className='coachProfile'>
        <h1>Hello {this.props.user.name}, welcome to your account!</h1>
          {this.props.coachInfo.map((info, i) => {
            if (this.props.user.id === info.user_id) {
              return (
                <div>
                  <div key={i} className='coachInfo'>
                      <h3>Zip Code: {info.zip_code}</h3>
                      <h3>Price: ${info.price} per hour</h3>
                      <p><b>About me:</b> {info.bio}</p>
                      <img src={info.image} alt='coach' />
                  </div>
                  <div className='inbox'>
                    <h2>Message Inbox</h2>
                    {this.props.messages.map((msg, j) => {
                      if (info.id === msg.coach_id) {
                       return (
                          <div className='message'>
                            <h4 key={j}>Message from player.id {msg.player_id}: {msg.body}</h4>
                            <p>{msg.body}</p>
                         </div>
                        )
                        }
                      })}
                  </div>
                </div>
              )
            }
          })}      
        <button className="submitButton" onClick={this.editProfile}>
          Edit Profile
        </button>
        {updateProfile}
        <Link to='/CoachForm'><button className="submitButton">Create</button></Link>
      </div>
    );
  }
}

