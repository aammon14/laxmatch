import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import UserForm from './UserForm';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('in signup comp, this.state:', this.state)
    this.props.submit(this.state);
    console.log('in sign up submit, this.state: ', this.state)
    if (this.state.role === 'player') {
      this.props.history.push('/playerForm')
    }
    
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
              value={this.state.name} />
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
          <label>Role
            <select name='role' value={this.state.role} onChange={this.handleChange}>
              <option>-- Select --</option>
              <option name='role' value='player'>Player</option>
              <option name='role' value='coach'>Coach</option>
            </select>
          </label>
          <br />
          <button type="submit" value="Submit">Submit</button>
        </form>
        <p><Link to="/"><button>Back Home</button></Link></p>
      </div>
    )
  }
}