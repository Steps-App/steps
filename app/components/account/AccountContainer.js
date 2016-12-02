// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';

//Material UI
import { StepsTextField } from '../material-style';

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class AccountInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const {user} = this.props;

    return (

      <div id="personal-info" className="col-xs-12" >
        <Helmet title="Account Info" />

          <fieldset className="form-box">
                <legend style={{width: '145px'}}>Personal Info</legend>
                <div className="row">
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <StepsTextField
                      floatingLabelText="First Name"
                      value={user.first_name}
                      fullWidth={true}
                      disabled={true}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <StepsTextField
                      floatingLabelText="Last Name"
                      value={user.last_name}
                      fullWidth={true}
                      disabled={true}
                    />
                  </div>
                  <div className="col-xs-12 col-md-4">
                    <StepsTextField
                      floatingLabelText="Email"
                      value={user.email}
                      fullWidth={true}
                      disabled={true}
                    />
                  </div>
                </div>
          </fieldset>
    </div>
    )
  }
}


// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({user}) => ({user })


export default connect(mapStateToProps, null)(AccountInfo);
