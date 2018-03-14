import React, { Component } from 'react';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
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
        <button type="submit" value="Submit">Submit</button>
      </form>
    );
  }
}