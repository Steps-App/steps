// import redux, react
import React, { Component } from 'react'
import { connect } from 'react-redux';


// Material theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';

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

        <nav id="nav">
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
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                      >
                        <Tab label="Sign-in" value="a" style={{ color: '#FFFFFF', background: '#011f4b' }} >
                          <div>
                               <form style={{ textAlign: 'center' }} >
                              <TextField
                                floatingLabelText="Email"
                                type = 'email'
                                fullWidth={true}
                              />
                              <TextField
                                floatingLabelText="Password"
                                type = 'password'
                                fullWidth={true}
                              />
                              <div className="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4">
                                <RaisedButton
                                  label="Sign-In"
                                  backgroundColor='#005b96'
                                  type="submit"
                                  fullWidth={true}
                                  labelStyle={{color: '#FFFFFF'}}
                                  style={{marginTop: '1em'}}
                                />
                              </div>
                            </form>
                          </div>
                        </Tab>
                        <Tab label="Register" value="b" style={{ color: '#000000', background: '#FFFFFF' }} >
                          <div>
                            <h1>Register</h1>
                          </div>
                        </Tab>
                </Tabs>
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








