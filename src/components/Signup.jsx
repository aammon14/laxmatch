import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import UserForm from './UserForm';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      name: '',
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // preventDefault and lift state back up to the parent
  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
  }

  // update form state
  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  render() {

    return (
      <div>
        <h1>Sign Up for LaxMatch:</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Name
            <input 
              type="text" 
              name="name" 
              onChange={this.handleChange}
              value={this.state.email} />
          </label>
          <br />
          <label>Email
            <input 
              type="text" 
              name="email" 
              onChange={this.handleChange}
              value={this.state.email} />
          </label>
          <br />
          <label>Password
            <input 
              type="password" 
              name="password" 
              onChange={this.handleChange}
              value={this.state.password} />
          </label>
          <br />
          <button type="submit" value="Submit">Submit</button>
        </form>
        <p><Link to="/"><button>Back Home</button></Link></p>
      </div>
    )
  }
}