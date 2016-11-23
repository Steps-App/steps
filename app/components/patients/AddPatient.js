import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { StepsTextField, StepsRaisedButton } from '../material-style'
import { errorText } from '../colors'

export default ({ handleChange, handleSubmit, errors }) => (
  <div id="new-patient">
    <Helmet title="New Patient" />
    <form className="new-patient-form" onSubmit={ handleSubmit }>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-lg-offset-2 col-lg-8">
          <StepsTextField
            floatingLabelText="First Name"
            errorText={ errors.firstName }
            fullWidth={ true }
            onChange={(evt) => handleChange('firstName', evt.target.value) } />
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-offset-2 col-lg-8">
          <StepsTextField
            floatingLabelText="Last Name"
            errorText={ errors.lastName }
            fullWidth={ true }
            onChange={(evt) => handleChange('lastName', evt.target.value) } />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-lg-offset-2 col-lg-8">
          <StepsTextField
            floatingLabelText="Email"
            type="email"
            errorText={ errors.email }
            fullWidth={ true }
            onChange={(evt) => handleChange('email', evt.target.value) } />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-lg-offset-2 col-lg-8">
          <StepsTextField
            floatingLabelText="Patient ID"
            errorText={ errors.patientId }
            fullWidth={ true }
            onChange={(evt) => handleChange('patientId', evt.target.value) } />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <StepsRaisedButton
          label="Create"
          type="submit" />
        {
          errors.submit ?
            <p style={{ color: errorText }}>{ errors.submit }</p> : null
        }
      </div>
    </form>
  </div>
)
