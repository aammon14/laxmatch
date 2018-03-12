import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className='homePage'>
        <div className='homeTitle'>
          <h1>Welcome to Lax Match</h1>
          <h3>Find your coach, up your game</h3>
        </div>
        <div className='homeButtons'>
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/login"><button>Log In</button></Link>
        </div>
      </div>
    )
  }
}