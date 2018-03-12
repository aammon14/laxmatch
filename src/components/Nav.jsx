import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div className="nav_bar">
        <div className="nav_links">
          <Link className="nav_none" to="/coaches">
            Coaches
          </Link>
        </div>
        <div className="nav_links right_link">
          <Link className="nav_none" to="/profile">
            Profile
          </Link>
        </div>
        <div className="nav_links">
          <Link className="nav_none" to="/login">
            Login
          </Link>
        </div>
        <div className="nav_links">
          <Link className="nav_none" to="/signup">
            Sign Up
          </Link>
        </div>
        <div className="nav_links">
          <Link className="nav_none" to="/">
            Home
          </Link>
        </div>
      </div>
    );
  }
}
export default Nav;