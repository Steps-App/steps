// import redux, react
import React from 'react'
import { connect } from 'react-redux';

// Material theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//External Components Modular
import Signin from './Signin'

//About us
const defaultPix = require("../../../src/images/defaultProfile.png");

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export default () => (
  <MuiThemeProvider>
    <div className="container" id="h">
    <div className="container" id="home">
      <nav className="home-nav">
        <div className="navbar-header">
          <a href="#">Steps</a>
        </div>
        <ul className="navbar-links">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div className="container" id="main">
        <div className="row">
          <div className="col-xs-5 intro-text">
            <p className="intro-heading" >Physical therapy for the way you live today</p>
            <p className="intro-content">We help you make the steps to recovery</p>
          </div>
          <div className="col-xs-offset-2 col-xs-4">
            <Signin />
          </div>
        </div>
      </div>
    </div>

    <div className="container" id="aboutus">
      <div className="aboutus" id="whoami">
        <h3> About Us</h3>
      </div>
      <div className="row" id="us">
        <div className="col-md-3" id="jake">
          <img src={defaultPix}/>
          <p>Hi, I am Jake Peyser</p>
        </div>
        <div className="col-md-3" id="emily">
          <img src={defaultPix}/>
          <p>Hi, I am Mike</p>
        </div>
        <div className="col-md-3" id="mike">
          <img src={defaultPix}/>
          <p>Hi, Emily</p>
        </div>
        <div className="col-md-3" id="hiten">
          <img src={defaultPix}/>
          <p>Hi, Hiten</p>
        </div>
      </div>
    </div>
</div>

  </MuiThemeProvider>
)
