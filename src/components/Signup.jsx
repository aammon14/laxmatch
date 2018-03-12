import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import UserForm from './UserForm';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    this.props.submit(data);
  }

  render() {

    return (
      <div>
        Sign Up for LaxMatch:
        Insert form here
        <p><Link to="/"><button>Back Home</button></Link></p>
      </div>
    )
  }
}