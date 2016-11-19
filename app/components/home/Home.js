// import redux, react
import React from 'react'
import { connect } from 'react-redux';

// Material theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//External Components Modular
import Signin from './Signin'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export default () => (
  <MuiThemeProvider>
    <div id="home">
      <nav className="home-nav">
        <div className="navbar-header">
          <a href="#">Therap.ly</a>
        </div>
        <ul className="navbar-links">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div className="main">
        <div className="row">
          <div className="col-xs-5 intro-text">
            <p className="intro-heading" >Physical therapy for the way you live today</p>
            <p className="intro-content">Plans starting as low as $500 per practice</p>
          </div>
          <div className="col-xs-offset-2 col-xs-4">
            <Signin />
          </div>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
)
