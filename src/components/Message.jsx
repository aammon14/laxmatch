import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coach: '',
      player: this.props.user,
      message: ''
    }
  }
  render() {
    return (
      <div>
        <p>Message</p>

      </div>
    )
  }
}