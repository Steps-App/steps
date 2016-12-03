// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';

//Material UI
import { StepsTextField, StepsRaisedButton, StepsFlatButton } from '../material-style'
import { Paper } from 'material-ui';
import { background, primary } from '../colors';
import moment from 'moment';

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class AccountInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const {user} = this.props;

    return (

      <div id="account-info" className="col-xs-12" > 
        <Helmet title="Account Info" />
          <h1 className="page-header">Account Info</h1>
          <Paper style={{ backgroundColor: background, disabledTextColor: primary, padding:'15px' }} zDepth={2} rounded={false} >
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-lg-offset-2 col-lg-8">
                <StepsTextField
                  floatingLabelText="First Name"
                  value={user.first_name}
                  fullWidth={ true }
                  />
              </div>
              <div className="col-xs-12 col-sm-6 col-lg-offset-2 col-lg-8">
                <StepsTextField
                  floatingLabelText="Last Name"
                  value={user.last_name}
                  fullWidth={ true }
                   />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-lg-offset-2 col-lg-8">
                <StepsTextField
                  floatingLabelText="Email"
                  value={user.email}
                  fullWidth={ true }
                   />
              </div>
            </div>

            { user.role === "patient" ?
                <div className="row">
                   <div className="col-xs-12 col-lg-offset-2 col-lg-8">
                    <StepsTextField
                      floatingLabelText="Date of Birth"
                      value={ user.DOB ? moment(user.DOB).format('MMM Do, YYYY') : 'N/A' }
                      fullWidth={ true }
                       />
                  </div>
                  <div className="col-xs-12 col-lg-offset-2 col-lg-8">
                    <StepsTextField
                      floatingLabelText="EMR ID"
                      value={user.emr_id}
                      fullWidth={ true }
                       />
                  </div>
                </div>
              : 
                <div className="row">
                   <div className="col-xs-12 col-lg-offset-2 col-lg-8">
                    <StepsTextField
                      floatingLabelText="License ID"
                      value={ user.license_id }
                      fullWidth={ true }
                       />
                  </div>
                  <div className="col-xs-12 col-lg-offset-2 col-lg-8">
                    <StepsTextField
                      floatingLabelText="Practice Name"
                      value={user.practice_name ? user.practice_name : 'N/A' }
                      fullWidth={ true }
                       />
                  </div>
                </div>
            }

          </Paper>

      </div>
    )
  }
}


// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({user}) => ({user })


export default connect(mapStateToProps, null)(AccountInfo);
