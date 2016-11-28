// import redux, react
import React from 'react'
import { connect } from 'react-redux';

// Material theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Paper} from 'material-ui';

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
          <li><a href="#aboutus">About Us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div className="container" id="intro">
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
        <h2> About Us</h2>
      </div>
      <div className="row" id="aboutinfo">
         <div className="col-xs-12 col-md-6">
           <img src={require("../../../src/images/work.jpg")} id="work"></img>
         </div>
         <div className="col-xs-12 col-md-6">
           <div className="aboutcontent" >
               <h4 className="row">Who are we?</h4>
               <p className="row"> We are a group of Students who are at Fullstack Academy blah balh blahdsflkajdlkfjdijsadlnn kldjslafjl dsfsldkfj s</p>
           </div>
         </div>
      </div>
      <h2> Meet Us </h2>
      <div className="row" id="us">
        <div className="col-xs-12 col-sm-6 col-md-3" id="jake">
          <h4>Jake</h4>
          <img src={defaultPix}/>
          <p>Hi, I am Jake Peyser</p>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3" id="emily">
          <h4>Emily</h4>
          <img src={defaultPix}/>
          <p>Hi, I am Mike</p>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3" id="mike">
          <h4>Mike</h4>
          <img src={defaultPix}/>
          <p>Hi, Emily</p>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3" id="hiten">
          <h4>Hiten</h4>
          <img src={defaultPix}/>
          <p>Hi, Hiten</p>
        </div>
      </div>
    </div>
  </div>

  </MuiThemeProvider>
)
