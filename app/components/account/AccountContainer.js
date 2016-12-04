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

const AccountInfo = ({ user }) => (
  <div id="account-info" className="col-xs-12" > 
    <Helmet title="Account Info" />
      <h1 className="page-header">Account Info</h1>
      <Paper style={{ backgroundColor: background, disabledTextColor: primary, padding:'15px' }} zDepth={2} rounded={false} >
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <StepsTextField
              floatingLabelText="First Name"
              value={user.first_name}
              disabled={true}
              fullWidth={ true } />
          </div>
          <div className="col-xs-12 col-sm-6">
            <StepsTextField
              floatingLabelText="Last Name"
              value={user.last_name}
              disabled={true}
              fullWidth={ true } />
          </div>
        </div>
        <StepsTextField
          floatingLabelText="Email"
          value={user.email}
          disabled={true}
          fullWidth={ true } />

        { user.role === "patient" ?
          <StepsTextField
            floatingLabelText="Date of Birth"
            value={ user.DOB ? moment(user.DOB).format('MMM Do, YYYY') : 'N/A' }
            disabled={true}
            fullWidth={ true } />
          : 
            <div>
              <StepsTextField
                floatingLabelText="License ID"
                value={ user.license_id }
                disabled={true}
                fullWidth={ true } />
              <StepsTextField
                floatingLabelText="Practice Name"
                value={user.practice_name ? user.practice_name : 'N/A' }
                disabled={true}
                fullWidth={ true } />
            </div>
        }
        <StepsTextField
          floatingLabelText="Profile Picture"
          value={user.img_URL}
          disabled={true}
          fullWidth={ true } />
      </Paper>
  </div>
)

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ user }) => ({ user })


export default connect(mapStateToProps)(AccountInfo);
