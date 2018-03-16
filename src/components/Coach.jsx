import React, { Component } from "react";

var coachId;
var playerId

class Coach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coach: {},
      coach_id: 1,
      user: this.props.user,
      users: this.props.users,
      body: "",
      player_id: 2
    };
    console.log('in coach comp, this.props', this.props)
    console.log('in coach comp, this.state', this.state)
    console.log('this.props.match.params.id: ', this.props.match.params.id)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCoachId = this.getCoachId.bind(this);
    //this.getPlayerId = this.getPlayerId.bind(this);
  }
  componentDidMount() {
    this.getCoachId();
    //this.getPlayerId();
    console.log('in coach comp did mount, this.state', this.state)
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log('in Coach comp handleSubmit, this.state:', this.state)
    this.props.createMessage({ player_id: this.state.player_id, coach_id: coachId, body: this.state.body});
    this.props.history.push('/profile')
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
    this.handleSubmit
  }

  getCoachId() {
    let coachList = this.props.coachInfo.map(coach => {
      if (coach.user_id == this.props.match.params.id) {
        return (
          coachId = coach.id
        )
      } 
    })
    console.log("coachId", coachId)
    this.setState({
      coach_id: coachId
    })
    console.log('in getCoachid, this.state: ', this.state)
  }

  // getPlayerId() {
  //   let playerList = this.props.playerInfo.map(player => {
  //     if (player.user_id == this.state.user.id) {
  //       return (
  //         playerId = player.id
  //       )
  //     }
  //   })
  //   console.log('playerId', playerId)
  //   this.setState({
  //     player_id: playerId
  //   })
  //   console.log('in getPlayerId, this.state: ', this.state)
  // }

  render() {

    const coach = this.props.users.map((person, i) => {
      //console.log('in coach render, person: ', person)
      if (person.id == this.props.match.params.id) {
        return (

          <div key={i}>
            <h1>Send a message to Coach {person.name}:</h1>
            <p>Be sure to leave {person.name} some information on how to contact you regarding lessons</p>
              <form onSubmit={this.handleSubmit}>
                <label>Message
                  <input 
                    type="text" 
                    name="body" 
                    onChange={this.handleChange}
                    value={this.state.body} />
                </label>

    
                <br />
                <button type="submit" value="Submit">Submit</button>
              </form>
          </div>
        )
      }
    })
    return <div>{coach}</div>
  }
}
export default Coach;
