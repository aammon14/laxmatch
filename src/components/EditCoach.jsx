import React, { Component } from 'react';

export default class EditCoach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip_code: '',
      price: '',
      bio: '',
      image: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
    this.props.findCoachInfo();
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
        <label>Zip Code
          <input 
            type="text" 
            name="zip_code" 
            onChange={this.handleChange}
            value={this.state.zip_code} />
        </label>
        <br />
        <label>Price
          <input 
            type="text" 
            name="price" 
            onChange={this.handleChange}
            value={this.state.price} />
        </label>
        <br />
        <label>About Me
          <input 
            type="text" 
            name="bio" 
            onChange={this.handleChange}
            value={this.state.bio} />
        </label>
        <br />
        <label>Image URL
          <input 
            type="text" 
            name="image" 
            onChange={this.handleChange}
            value={this.state.image} />
        </label>
        <button type="submit" value="Submit">Submit</button>
      </form>
    );
  }
}