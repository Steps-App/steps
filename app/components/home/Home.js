// import redux, react
import React from 'react'

// Material theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FontIcon } from 'material-ui';

// Custom components
import Signin from './Signin'

// Page content
const navbarLinks = {
  about: 'About Us',
  contact: 'Contact'
}
const teamMembers = [
  {
    name: 'Emily Ho',
    img: '../../../src/images/coders/emily_ho.jpeg',
    links: {
      github: 'https://github.com/emilydev',
      linkedin: 'https://www.linkedin.com/in/emily-ho-8a035235',
      email: 'mailto:emilyyho33@gmail.com'
    }
  },
  {
    name: 'Hiten Patel',
    img: '../../../src/images/coders/hiten_patel.png',
    links: {
      github: 'https://github.com/Hitenp1',
      email: 'mailto:hpduke2@gmail.com'
    }
  },
  {
    name: 'Jake Peyser',
    img: '../../../src/images/coders/jake_peyser.jpeg',
    links: {
      github: 'https://github.com/jakepeyser',
      linkedin: 'https://www.linkedin.com/in/jakepeyser',
      email: 'mailto:jakepeyser@gmail.com'
    }
  },
  {
    name: 'Mike Williams',
    img: '../../../src/images/coders/mike_williams.jpg',
    links: {
      github: 'https://github.com/mkewls',
      linkedin: 'https://www.linkedin.com/in/mewill',
      email: 'mailto:mw@mikewill.net'
    }
  }
]

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export default () => (
  <MuiThemeProvider>
    <div id="main">
      {/* Main header banner */}
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

      {/* Methodology section */}
      <div className="section">
        <div className="section-content">
          <div className="img-wrapper">
            <img src={require('../../../src/images/work.jpg')} id="work"></img>
          </div>
          <div className="content-text">
            <h3>Our Methodology</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet erat at neque accumsan malesuada in et purus. Suspendisse potenti. Aenean et tellus a turpis gravida sodales id a enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent tortor velit, accumsan sit amet maximus iaculis, condimentum quis magna. Fusce ac nulla tempor, vehicula risus vel, feugiat elit. Nulla ac quam ligula. Praesent pellentesque et sapien non fringilla.</p>
          </div>
        </div>
      </div>

      {/* Process section */}
      <div className="section">
        <div className="section-content">
          <div className="img-wrapper">
            <img src={require('../../../src/images/work.jpg')} id="work"></img>
          </div>
          <div className="content-text">
            <h3>The Process</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet erat at neque accumsan malesuada in et purus. Suspendisse potenti. Aenean et tellus a turpis gravida sodales id a enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent tortor velit, accumsan sit amet maximus iaculis, condimentum quis magna. Fusce ac nulla tempor, vehicula risus vel, feugiat elit. Nulla ac quam ligula. Praesent pellentesque et sapien non fringilla.</p>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="section team">
        <h3> The Team </h3>
        <div className="coders">
          {
            // Display each team member bubble
            teamMembers.map((coder, idx) => (
              <div key={ idx } className="coder-wrapper">
                <div className="coder">
                  <img src={coder.img} alt={coder.name} />
                  <div className="coder-data">
                    <h4>{coder.name}</h4>
                    <div className="coder-links">
                    {
                      Object.keys(coder.links).map((key, idx) =>
                        <a key={ idx } href={ coder.links[key] } target="_blank">
                          <FontIcon className="material-icons" color="white">home</FontIcon>
                        </a>
                      )
                    }
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  </MuiThemeProvider>
)
