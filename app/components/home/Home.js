// import redux, react
import React from 'react'

// Material theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { SvgIcon } from 'material-ui';
import { textLight } from '../colors';

// Custom components
import Signin from './Signin'
const smoothScroll = require('smoothscroll');

// Page content
const navbarLinks = {
  vision: 'Vision',
  methodology: 'Methodology',
  team: 'Team'
}
const teamMembers = [
  {
    name: 'Emily Ho',
    img: require('../../../src/images/coders/emily_ho.jpeg'),
    links: {
      github: 'https://github.com/emilydev',
      linkedin: 'https://www.linkedin.com/in/emily-ho-8a035235',
      email: 'mailto:emilyyho33@gmail.com'
    }
  },
  {
    name: 'Hiten Patel',
    img: require('../../../src/images/coders/hiten_patel.png'),
    links: {
      github: 'https://github.com/Hitenp1',
      email: 'mailto:hpduke2@gmail.com'
    }
  },
  {
    name: 'Jake Peyser',
    img: require('../../../src/images/coders/jake_peyser.jpeg'),
    links: {
      github: 'https://github.com/jakepeyser',
      linkedin: 'https://www.linkedin.com/in/jakepeyser',
      email: 'mailto:jakepeyser@gmail.com'
    }
  },
  {
    name: 'Mike Williams',
    img: require('../../../src/images/coders/mike_williams.jpg'),
    links: {
      github: 'https://github.com/mkewls',
      linkedin: 'https://www.linkedin.com/in/mewill',
      email: 'mailto:mw@mikewill.net'
    }
  }
]

const SocialMediaIcon = (props) => {
  switch (props.type) {
    case "github":
      return (
        <SvgIcon {...props} viewBox="0 0 120 120">
          <path d="M61,0.103 C27.653,0.103 0.612,27.138 0.612,60.491 C0.612,87.173 17.915,109.808 41.909,117.794 C44.926,118.354 46.034,116.484 46.034,114.889 C46.034,113.449 45.978,108.692 45.952,103.646 C29.152,107.299 25.607,96.521 25.607,96.521 C22.86,89.541 18.902,87.685 18.902,87.685 C13.422,83.937 19.315,84.015 19.315,84.015 C25.378,84.44 28.572,90.238 28.572,90.238 C33.958,99.468 42.699,96.8 46.145,95.258 C46.687,91.355 48.252,88.69 49.979,87.182 C36.566,85.657 22.465,80.478 22.465,57.339 C22.465,50.746 24.825,45.359 28.688,41.129 C28.06,39.609 25.993,33.467 29.272,25.149 C29.272,25.149 34.342,23.526 45.882,31.339 C50.7,30 55.867,29.327 61,29.304 C66.13,29.327 71.3,29.998 76.127,31.337 C87.653,23.524 92.717,25.147 92.717,25.147 C96.004,33.464 93.937,39.607 93.31,41.127 C97.182,45.357 99.525,50.744 99.525,57.337 C99.525,80.531 85.398,85.637 71.951,87.133 C74.118,89.007 76.048,92.683 76.048,98.316 C76.048,106.396 75.978,112.899 75.978,114.888 C75.978,116.495 77.066,118.378 80.126,117.785 C104.106,109.791 121.389,87.163 121.389,60.491 C121.388,27.14 94.35,0.104 61,0.104 L61,0.103 Z" id="Shape"></path>
          <path d="M23.484,86.806 C23.351,87.106 22.879,87.196 22.449,86.991 C22.009,86.795 21.764,86.386 21.906,86.085 C22.036,85.775 22.509,85.69 22.946,85.897 C23.386,86.094 23.636,86.507 23.483,86.807 L23.484,86.806 Z M25.93,89.535 C25.643,89.802 25.08,89.678 24.698,89.255 C24.302,88.835 24.228,88.272 24.521,88.001 C24.819,87.735 25.365,87.861 25.761,88.281 C26.155,88.707 26.233,89.265 25.931,89.536 L25.93,89.535 Z M28.312,93.012 C27.942,93.27 27.336,93.029 26.962,92.492 C26.592,91.954 26.592,91.309 26.972,91.052 C27.345,90.794 27.942,91.027 28.322,91.559 C28.69,92.104 28.69,92.749 28.312,93.011 L28.312,93.012 Z M31.573,96.373 C31.243,96.738 30.537,96.64 30.021,96.143 C29.494,95.656 29.347,94.963 29.678,94.599 C30.014,94.233 30.723,94.335 31.242,94.829 C31.769,95.315 31.928,96.009 31.575,96.372 L31.573,96.373 Z M36.073,98.324 C35.926,98.797 35.248,99.012 34.563,98.81 C33.88,98.603 33.433,98.05 33.573,97.572 C33.713,97.095 34.396,96.872 35.085,97.087 C35.768,97.293 36.215,97.843 36.073,98.324 Z M41.016,98.685 C41.033,99.183 40.453,99.595 39.736,99.605 C39.013,99.622 38.428,99.218 38.421,98.728 C38.421,98.225 38.989,97.818 39.711,97.804 C40.428,97.791 41.017,98.191 41.017,98.684 L41.016,98.685 Z M45.614,97.903 C45.7,98.388 45.201,98.887 44.488,99.02 C43.788,99.15 43.138,98.848 43.048,98.367 C42.962,97.869 43.47,97.37 44.17,97.241 C44.884,97.118 45.524,97.411 45.614,97.904 L45.614,97.903 Z" id="Shape"></path>
        </SvgIcon>
      )
    case "linkedin":
      return (
        <SvgIcon {...props} viewBox="0 3 55 40">
          <path d="M0,19 L5,19 C5,19 1,34.38 0.79,36.21 C0.58,38.04 1,41.81 7,42.9 C13,43.99 17.37,38.23 17.37,38.23 L16.54,42.9 L24.42,42.9 C24.42,42.9 28.5,27 30,23.5 C31.5,20 36.5,16.94 39,18.97 C41.5,21 40.37,24.24 39.34,26.88 C38.31,29.52 36,36.5 38,40 C40,43.5 46.59,45 50.32,40.67 C51.8992665,38.8452444 53.1449457,36.7567007 54,34.5 L50.73,33.57 C50.73,33.57 49,37.53 47,38.24 C45,38.95 43.27,37.43 46.59,29.92 C49.91,22.41 48.04,15.92 45.97,13.92 C43.9,11.92 38.3,11.28 35.19,13.11 C33.2353338,14.2849292 31.4828531,15.767278 30,17.5 L31,12.07 L18.82,12.27 L17,19 L22.39,19 C22.39,19 17.37,33.71 17,34 C16.63,34.29 13,37 11.55,37.48 C10.1,37.96 8.3,38.39 9.13,35.15 C9.96,31.91 14.93,12.03 14.93,12.03 L1.2,12.03 L0,18.56" id="Shape"></path>
          <circle id="Oval" cx="11" cy="4" r="4"></circle>
        </SvgIcon>
      )
    case "email":
      return (
        <SvgIcon {...props} viewBox="0 -13 85 80">
          <path d="M3,0.36218 C1.37258,0.36218 0,1.73478 0,3.36218 L0,53.3622 C0,54.9896 1.37258,56.3622 3,56.3622 L81,56.3622 C82.62742,56.3622 84,54.9896 84,53.3622 L84,3.36218 C84,1.73478 82.62742,0.36218 81,0.36218 L3,0.36218 L3,0.36218 Z M7.03125,4.36218 L76.96875,4.36218 L42,36.6435 L7.03125,4.36218 Z M4,6.98718 L26.625,27.8622 L4,49.6122 L4,6.98718 Z M80,6.98718 L80,49.6122 L57.375,27.8622 L80,6.98718 Z M29.5625,30.581 L40.65625,40.831 C41.4186523,41.5224679 42.5813477,41.5224679 43.34375,40.831 L54.4375,30.581 L77.09375,52.3622 L6.90625,52.3622 L29.5625,30.581 L29.5625,30.581 Z" id="Shape"></path>
        </SvgIcon>
      )
    default:
      return null;
  }
};

const aboutImagesStyle = { width: '300px' }

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export default () => (
  <MuiThemeProvider>
    <div id="main">
      {/* Background video
      <video className='background-video' src={require('../../../src/vids/Yoga_Background.mp4')} type='video/mp4'>
      </video>*/}
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
            // Set up linking and smooth scrolling to other sections
            Object.keys(navbarLinks).map((key, i) =>
              <li key={i}>
                <a href={`#${key}`}
                  onClick={ evt => {
                    evt.preventDefault();
                    window.history.pushState({}, "", `#${key}`);
                    smoothScroll(document.querySelector(`#${key}`));
                  }}>
                  { navbarLinks[key] }
                </a>
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

      {/* Vision section */}
      <div id="vision" className="section">
        <div className="section-content">
          <div className="img-wrapper">
            <img
              src={require('../../../src/images/sunsetjump.png')}
              className="img-circle img-responsive"
              style={ aboutImagesStyle }/>
          </div>
          <div className="content-text">
            <h2>Our Vision</h2>
            <p>We're a team that likes to solve problems. Our decision to build a digital product focused on
            improving physical therapy outcomes is rooted in a real-world need. With nearly 10 million people
            receiving physical therapy in the United States alone, and a lowly 30% completion rate, our goal
            is to provide better tools to both therapists and patients. On the patient side, Steps offers
            features to enhance engagement through video, workout logging, and progress. On the therapist
            side, real-time chat and analytic tools promote further involvement in a successfuly treatment.
            Working together, Steps aims to produce significantly improved outcomes.</p>
          </div>
        </div>
      </div>

      {/* Methodology section */}
      <div id="methodology" className="section">
        <div className="section-content">
          <div className="img-wrapper">
            <img
              src={require('../../../src/images/work.png')}
              className="img-circle img-responsive"
              style={ aboutImagesStyle }/>
          </div>
          <div className="content-text">
            <h2>Our Methodology</h2>
            <p>Our team arrives at problem-solving from diverse backgrounds. The common thread in our thinking is a
            user-centric design and commitment to quality code. We like to think that in designing for our
            user first, we can better execute a strong back-end codebase and intuitive front-end.
            We enjoy using back-end tools like Postgres/Sequelize and Express to provide reliable API's, and
            front-end tools like React and Redux to create seamless and consistent front-end interaction.
            We also like developing with great libraries and frameworks like Socket.io for our chat
            and notifications, and the D3-based Recharts for beautiful and useful visualizations. Utility +
            Design = A Great Experience.
            </p>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div id="team" className="section team">
        <h2>The Team</h2>
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
                      // Display each coder's social icons
                      Object.keys(coder.links).map((key, idx) =>
                        <a key={ idx } href={ coder.links[key] } target="_blank">
                          <SocialMediaIcon color={ textLight } type={ key } />
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
