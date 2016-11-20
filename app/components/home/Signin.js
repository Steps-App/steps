// import redux, react
import React, { Component } from 'react'
import { connect } from 'react-redux'

//Material UI
import { StepsTextField, StepsRaisedButton, StepsTabs, StepsTab } from '../material-style.js'
import { tabs } from '../colors'
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
      <StepsTabs>
        <StepsTab label="Sign In" value="sign-in" tab='left' curTab={ this.state.tab } 
          onActive={(el) => this.handleChange('tab', el.props.value)} >
          <div style={{ padding: '0 15px', borderTopWidth: '2px', borderTopStyle: 'solid', borderTopColor: tabs }}>
            <form style={{ textAlign: 'center' }} onSubmit={ this.handleSubmit } >
              <StepsTextField
                floatingLabelText="Email"
                type = 'email'
                fullWidth={true}
                onChange={(evt) => this.handleChange("email", evt.target.value) } />
              <StepsTextField
                floatingLabelText="Password"
                type = 'password'
                fullWidth={true}
                onChange={(evt) => this.handleChange("password", evt.target.value) } />
              <span className="error-message">{ this.login_error }</span>
              <StepsRaisedButton
                label="Sign In"
                type="submit"
                fullWidth={true}
                style={buttonStyle} />
            </form>
          </div>
        </StepsTab>
        <StepsTab label="Register" value="register" tab='right' curTab={ this.state.tab } 
          onActive={(el) => this.handleChange('tab', el.props.value)} >
          <div style={{ padding: '0 15px', borderTopWidth: '2px', borderTopStyle: 'solid', borderTopColor: tabs }}>
            <form style={{ textAlign: 'center' }} onSubmit={ this.handleSubmit }>
              <StepsTextField
                floatingLabelText="Licence ID"
                fullWidth={true}
                onChange={(evt) => this.handleChange("licenseId", evt.target.value) } />
              <StepsTextField
                floatingLabelText="Practice Name"
                fullWidth={true}
                onChange={(evt) => this.handleChange("practiceName", evt.target.value) } />
              <StepsTextField
                floatingLabelText="Email"
                type = 'email'
                fullWidth={true}
                onChange={(evt) => this.handleChange("email", evt.target.value) } />
              <StepsTextField
                floatingLabelText="Password"
                type = 'password'
                fullWidth={true}
                onChange={(evt) => this.handleChange("password", evt.target.value) } />
              <StepsRaisedButton
                label="Register"
                type="submit"
                fullWidth={true}
                style={buttonStyle} />
            </form>
          </div>
        </StepsTab>
      </StepsTabs>
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
