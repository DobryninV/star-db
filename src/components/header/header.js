import { Component } from "react";
import React from 'react'
import { Link } from "react-router-dom";

import './header.css';

export default class Header extends Component {

  render() {
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Star DB</Link>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/people/">People</Link></li>
              <li><Link to="/planet/">Planet</Link></li>
              <li><Link to="/starship/">Starship</Link></li>
              <li><Link to="/login/">Login</Link></li>
              <li><Link to="/secret/">Secret</Link></li>
            </ul>
            <button className="btn btn-style" onClick={this.props.onServiceChange}>Change Service</button>
          </div>

        </div>
      </nav>
    )
  }
}