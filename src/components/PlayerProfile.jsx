import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PlayerProfile extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
       <h1>Hello {this.props.user.name}, welcome to your account!</h1>
       <br />
       <button onClick={this.logout}>Logout</button>
       <Link to="/"><button>View Coaches</button></Link>
      </div>
    )
  }
}