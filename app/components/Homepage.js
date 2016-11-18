// import redux, react
import React, { Component } from 'react'
import { connect } from 'react-redux';

// Material theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';

//External Components Modular
import Signin from './Signin'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class Homepage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange (value) {
    this.setState({
      value: value,
    });
  };

  render () {

    return (
       <MuiThemeProvider>
        <div className="homepage">

        <nav id="navbar" className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-header">
              <a href="#">Therap.ly</a>
          </div>
          <div>
            <ul className="navbar-right">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </nav>


        <div className="main">
            <div className="intro-text col-md-5">
                <div className="intro-heading" >Physical therapy for the way you live today</div>
                <div className="intro-content">Plans starting as low as $500 per practice</div>
            </div>
            <div className="signinform col-md-4">
              <div className='tabbox'>
                <Signin />
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = state => ({
  // some state to props mapping
})

const mapDispatchToProps = dispatch => ({
  // some dispatch to props mapping
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(Homepage);  








