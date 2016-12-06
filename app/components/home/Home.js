// import redux, react
import React from 'react';
import Helmet from 'react-helmet';

// Material theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { SvgIcon } from 'material-ui';
import { textLight } from '../colors';

// Custom components
import Signin from './Signin';
import smoothScroll from 'smoothscroll';

// SVGs
import Logo from '../../../src/images/logo.svg';
import GitHub from '../../../src/images/social-media/github.svg';
import LinkedIn from '../../../src/images/social-media/linkedin.svg';
import Email from '../../../src/images/social-media/email.svg';

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
    img: require('../../../src/images/coders/jake_peyser.jpg'),
    links: {
      github: 'https://github.com/jakepeyser',
      linkedin: 'https://www.linkedin.com/in/jakepeyser',
      email: 'mailto:jakepeyser@gmail.com'
    }
  },
  {
    name: 'Mike Williams',
    img: require('../../../src/images/coders/mike_williams.png'),
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
      return <GitHub />
    case "linkedin":
      return <LinkedIn />
    case "email":
      return <Email />
    default:
      return null;
  }
};

const aboutImagesStyle = { width: '300px' }

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export default () => (
  <MuiThemeProvider>
    <div id="main">
      <Helmet defaultTitle="Steps" />
      {/* Background video
      <video className='background-video' src={require('../../../src/vids/Yoga_Background.mp4')} type='video/mp4'>
      </video>*/}
      {/* Main header banner */}
      <div className="container" id="home">
        <nav className="home-nav">
          <div className="navbar-header">
            <a href="#">
              <Logo />
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
              src={require('../../../src/images/home/sunsetjump.png')}
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
              src={require('../../../src/images/home/work.png')}
              className="img-circle img-responsive"
              style={ aboutImagesStyle }/>
          </div>
          <div className="content-text">
            <h2>Our Methodology</h2>
            <p>Our team arrives at problem-solving from diverse backgrounds. The common thread in our thinking is a
            user-centric design and commitment to quality code. We like to think that in designing for our
            user first, we can better execute a strong back-end codebase and intuitive front-end.
            We enjoy using back-end tools like Postgres/Sequelize and Express to provide reliable APIs, and
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
