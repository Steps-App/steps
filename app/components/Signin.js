// import redux, react
import React, { Component } from 'react'
import { connect } from 'react-redux'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class Signin extends Component {

		constructor(props) {
			super(props) 
			this.state = {
				licenceId: '', practiceName: '', email: '', 
				password: '', login_error: ''}

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

			const credentials = {
				email: this.state.email,
				password: this.state.password
				}

			if(evt.target.childNodes[0].innerHTML === "Sign-In") {
				this.props.login(credentials, (err) => {
					this.setState({ login_error: err });
				})
			} else {
				credentials.firstname = this.state.firstname
				credentials.lastname = this.state.lastname
				this.props.signup(credentials)
			}
		}

		render() {
			
			return (
			
					<Tabs inkBarStyle={{backgroundColor:"transparent"}}  tabItemContainerStyle={{backgroundColor:"transparent"}}>
                        <Tab label="Sign-in" value="a" style={{color: '#FFFFFF', background: '#011f4b', borderTopLeftRadius: '9px' }} >
                          <div>
                            <form style={{ textAlign: 'center' }} onSubmit={ this.handleSubmit } >
                              <TextField
                                floatingLabelText="Email"
                                type = 'email'
                                fullWidth={true}
                                underlineFocusStyle={{borderColor: '#005b96'}}
                                floatingLabelFocusStyle={{color: '#005b96'}}
                                onChange={(evt) => this.handleChange("email", evt.target.value) }
                              />
                              <TextField
                                floatingLabelText="Password"
                                type = 'password'
                                fullWidth={true}
                                underlineFocusStyle={{borderColor: '#005b96'}}
                                floatingLabelFocusStyle={{color: '#005b96'}}
                                onChange={(evt) => this.handleChange("password", evt.target.value) }
                              />
                              <span className="error-message">{ this.login_error }</span>
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
                        <Tab label="Register" value="b" style={{ color: '#000000', background: '#FFFFFF', borderTopRightRadius: '9px' }} >
                          <div>
                            <form style={{ textAlign: 'center' }} onSubmit={ this.handleSubmit }>
                              <TextField
                                floatingLabelText="Licence ID"
                                fullWidth={true}
                                underlineFocusStyle={{borderColor: '#005b96'}}
                                floatingLabelFocusStyle={{color: '#005b96'}}
                                onChange={(evt) => this.handleChange("licenceId", evt.target.value) }
                              />
                              <TextField
                                floatingLabelText="Practice Name"
                                fullWidth={true}
                                underlineFocusStyle={{borderColor: '#005b96'}}
                                floatingLabelFocusStyle={{color: '#005b96'}}
                                onChange={(evt) => this.handleChange("practiceName", evt.target.value) }
                              />
                              <TextField
                                floatingLabelText="Email"
                                type = 'email'
                                fullWidth={true}
                                underlineFocusStyle={{borderColor: '#005b96'}}
                                floatingLabelFocusStyle={{color: '#005b96'}}
                                onChange={(evt) => this.handleChange("email", evt.target.value) }
                              />
                              <TextField
                                floatingLabelText="Password"
                                type = 'password'
                                fullWidth={true}
                                underlineFocusStyle={{borderColor: '#005b96'}}
                                floatingLabelFocusStyle={{color: '#005b96'}}
                                onChange={(evt) => this.handleChange("password", evt.target.value) }
                              />
                              <div className="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4">
                                <RaisedButton
                                  label="Register"
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
                </Tabs>
			)
		}

}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapDispatchtoProps = dispatch => ({ 
	signup: credentials => {
		dispatch(signup(credentials));
	},
	login: (credentials, displayErr) => {
		dispatch(login(credentials, displayErr));
	}
})

export default connect(
  null, mapDispatchToProps
)(Signin);

