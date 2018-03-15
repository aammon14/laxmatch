import React, { Component } from 'react';

export default class EditPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip_code: '',
      age: '',
      bio: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);

    this.props.findPlayerInfo;
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
    this.handleSubmit
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Zip Code
          <input 
            type="text" 
            name="zip_code" 
            onChange={this.handleChange}
             />
        </label>
        <br />
        <label>Age
          <input 
            type="text" 
            name="age" 
            onChange={this.handleChange}
             />
        </label>
        <br />
        <label>About Me
          <input 
            type="text" 
            name="bio" 
            onChange={this.handleChange}
             />
        </label>
        <button type="submit" value="Submit">Submit</button>
      </form>
    );
  }
}