import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className='homePage'>
        <div className='homeTitle'>
          <h1>Welcome to Lax Match</h1>
          <h2>Find your coach, up your game</h2>
          <h2>Book a lesson now!</h2>
        </div>
        <div>
          <Link to="/signup"><button className='homeButtons'>Sign Up</button></Link>
          <Link to="/login"><button className='homeButtons'>Log In</button></Link>
        </div>
      </div>
    )
  }
}