import React, { Component } from "react";

export default class CoachProfile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hello Coach {this.props.user.name}, welcome to your account!</h1>
        {this.props.coachInfo.map((info, i) => {
            if (this.props.user.id === info.user_id) {
              return (
                <div key={i}>
                  <h3>Zip Code: {info.zip_code}</h3>
                  <h3>Price: ${info.price} per hour</h3>
                  <p>About me: {info.bio}</p>
                  <img src={info.image} />
                </div>
              )
            }
          
        })}
        
      </div>
    );
  }
}