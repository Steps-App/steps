// import redux, react
import React, { Component } from 'react'
import { connect } from 'react-redux'

//Material UI
import { TherapyTextField, TherapyRaisedButton } from '../material-style.js'
import { background, tabs, textLight, textDark } from '../colors'
import { Tabs, Tab } from 'material-ui/Tabs';
import { MenuItem } from 'material-ui';

const borderRadius = '4px';
const selectedTab = { color: textLight, background: tabs };
const inactiveTab = { color: textDark, background: background };
const buttonStyle = { marginTop: '1em', marginBottom: '1.5em' };

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class Signin extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      licenseId: '', practiceName: '', email: '', 
      password: '', tab:'sign-in', login_error: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  handleChange(field, value) {
    let newState = {};
    newState[field] = value
    this.setState(newState);
  }

  handleSubmit (evt) {
    evt.preventDefault();

    if(!this.state.licenseId) {
      const credentials = {
        email: this.state.email,
        password: this.state.password
      }
      this.props.signin(credentials)	
    } else {
      const credentials = {
        licenseId: this.state.licenseId,
        practiceName: this.state.practiceName,
        email: this.state.email,
        password: this.state.password
      }
      this.props.register(credentials)
    }

    //need to work on login error  
    //	this.props.login(credentials, (err) => {
    //		this.setState({ login_error: err });}
  }

  render() {
    return (
      <Tabs
        style={{backgroundColor: background, borderRadius: borderRadius }}
        inkBarStyle={{backgroundColor:"transparent"}}
        tabItemContainerStyle={{backgroundColor:"transparent"}}>
        <Tab label="Sign In" value="sign-in"
          onActive={(el) => this.handleChange('tab', el.props.value)}
          style={Object.assign({borderTopLeftRadius: borderRadius }, (this.state.tab === 'sign-in' ? selectedTab : inactiveTab))} >
          <div style={{ padding: '0 15px', borderTopWidth: '2px', borderTopStyle: 'solid', borderTopColor: tabs }}>
            <form style={{ textAlign: 'center' }} onSubmit={ this.handleSubmit } >
              <TherapyTextField
                floatingLabelText="Email"
                type = 'email'
                fullWidth={true}
                onChange={(evt) => this.handleChange("email", evt.target.value) }
              />
              <TherapyTextField
                floatingLabelText="Password"
                type = 'password'
                fullWidth={true}
                onChange={(evt) => this.handleChange("password", evt.target.value) }
              />
              <span className="error-message">{ this.login_error }</span>
              <TherapyRaisedButton
                label="Sign In"
                type="submit"
                fullWidth={true}
                style={buttonStyle}
              />
            </form>
          </div>
        </Tab>
        <Tab label="Register" value="register"
          onActive={(el) => this.handleChange('tab', el.props.value)}
          style={Object.assign({borderTopLeftRadius: borderRadius }, (this.state.tab === 'register' ? selectedTab : inactiveTab))} >
          <div style={{ padding: '0 15px', borderTopWidth: '2px', borderTopStyle: 'solid', borderTopColor: tabs }}>
            <form style={{ textAlign: 'center' }} onSubmit={ this.handleSubmit }>
              <TherapyTextField
                floatingLabelText="Licence ID"
                fullWidth={true}
                onChange={(evt) => this.handleChange("licenseId", evt.target.value) }
              />
              <TherapyTextField
                floatingLabelText="Practice Name"
                fullWidth={true}
                onChange={(evt) => this.handleChange("practiceName", evt.target.value) }
              />
              <TherapyTextField
                floatingLabelText="Email"
                type = 'email'
                fullWidth={true}
                onChange={(evt) => this.handleChange("email", evt.target.value) }
              />
              <TherapyTextField
                floatingLabelText="Password"
                type = 'password'
                fullWidth={true}
                onChange={(evt) => this.handleChange("password", evt.target.value) }
              />
              <TherapyRaisedButton
                label="Register"
                type="submit"
                fullWidth={true}
                style={buttonStyle}
              />
            </form>
          </div>
        </Tab>
      </Tabs>
    )
  }
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapDispatchtoProps = dispatch => ({ 
  signin: credentials => {
    console.log('Sign in:', credentials)
  },
  register: (credentials, displayErr) => {
    console.log('Sign up:', credentials)
  }
})

export default connect(null, mapDispatchtoProps)(Signin);
