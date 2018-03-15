import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import UserForm from './UserForm';

export default class PlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user.id,
      price: '',
      zip_code: '',
      bio: '',
      image: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('in CoachForm comp, this.state:', this.state)
    this.props.create(this.state);
    this.props.history.push('/')
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
        <h1>Create Your Profile:</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Price
            <input 
              type="text" 
              name="price" 
              onChange={this.handleChange}
              value={this.state.price} />
          </label>
          <br />
          <label>Zip Code
            <input 
              type="text" 
              name="zip_code" 
              onChange={this.handleChange}
              value={this.state.zip_code} />
          </label>
          <br />
          <label>About Me:
            <input 
              type="text" 
              name="bio" 
              onChange={this.handleChange}
              value={this.state.bio} />
          </label>
          <label>Image URL:
            <input 
              type="text" 
              name="image" 
              onChange={this.handleChange}
              value={this.state.image} />
          </label>
          <label>
            <input
              type="hidden"
              name="user_id"
              onChange={this.handleChange}
              value={this.state.user_id} />
          </label>
          <br />
          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>
    )
  }
}