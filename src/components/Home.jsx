import React, { Component } from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <div>LaxMatch Home Page</div>
        <Link to="/signup"><button>Sign Up</button></Link>
        <br />
        <Link to="/login"><button>Log In</button></Link>
      </div>
    )
  }
}
