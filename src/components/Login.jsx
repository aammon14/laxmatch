import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import UserForm from './UserForm';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
    this.props.history.push('./profile')
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Email
            <input 
              type="text" 
              name="email" 
              onChange={this.handleChange}
              value={this.state.email} />
          </label>
          <label>Password
            <input 
              type="password" 
              name="password" 
              onChange={this.handleChange}
              value={this.state.password} />
          </label>
          <button type="submit" value="Submit">Submit</button>
        </form>
        <p><Link to="/"><button>Back Home</button></Link></p>
      </div>
    )
  }
}