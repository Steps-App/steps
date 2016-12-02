// import redux, react
import React from 'react'
import { connect } from 'react-redux';

// Material theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Paper} from 'material-ui';

//External Components Modular
import Signin from './Signin'

//About us
const defaultPix = '../../../src/images/defaultProfile.png';

const navbarLinks = {
  about: 'About Us',
  contact: 'Contact'
}


// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export default () => (
  <MuiThemeProvider>
    <div id="main">
      <div className="container" id="home">
        <nav className="home-nav">
          <div className="navbar-header">
            <a href="#">
              <svg width="45px" height="30px" viewBox="0 0 204 137">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none">
                  <g id="Group" transform="translate(0.000000, -0.362180)" fill="#FFFFFF">
                    <path d="M0,108.36218 L204,108.36218 L204,137.36218 L0,137.36218 L0,108.36218 Z M2,110.36218 L202,110.36218 L202,135.36218 L2,135.36218 L2,110.36218 Z" id="Shape"></path>
                    <path d="M50,54.36218 L204,54.36218 L204,83.36218 L50,83.36218 L50,54.36218 Z M52,56.36218 L202,56.36218 L202,81.36218 L52,81.36218 L52,56.36218 Z" id="Shape"></path>
                    <path d="M100,0.36218 L204,0.36218 L204,29.36218 L100,29.36218 L100,0.36218 Z M102,2.36218 L202,2.36218 L202,27.36218 L102,27.36218 L102,2.36218 Z" id="Shape"></path>
                  </g>
                </g>
              </svg>
              <h1>Steps</h1>
            </a>
          </div>
          <ul className="navbar-links">
          {
            Object.keys(navbarLinks).map((key, i) =>
              <li key={i}>
                <a href={`#${key}`}>{navbarLinks[key]}</a>
              </li>
            )
          }
          </ul>
        </nav>
        <div className="intro">
          <div className="intro-content">
            <div className="intro-text">
              <p className="intro-heading" >Physical therapy for the way you live today</p>
              <p className="intro-content">We help you make the steps to recovery</p>
            </div>
            <div className="signup-form">
            <Signin />
            </div>
          </div>
        </div>
      </div>

      <div className="container" id="about">
        <div className="aboutus" id="whoami">
          <h2> About Us</h2>
        </div>
        <div className="row" id="aboutinfo">
          <div className="col-xs-12 col-md-6">
            <img src={require('../../../src/images/work.jpg')} id="work"></img>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="aboutcontent" >
                <h4 className="row">Who are we?</h4>
                <p className="row"> We are a group of Students who are at Fullstack Academy blah balh blahdsflkajdlkfjdijsadlnn kldjslafjl dsfsldkfj s</p>
            </div>
          </div>
        </div>
        <div className="container" id="contact">
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
    </div>

  </MuiThemeProvider>
)
