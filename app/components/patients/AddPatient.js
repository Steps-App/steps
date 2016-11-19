import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { TherapyTextField, TherapyRaisedButton } from '../material-style.js'

export default ({ handleChange, handleSubmit, errors }) => (
  <div id="new-patient">
    <Helmet title="New Patient" />
    <form className="new-patient-form" onSubmit={ handleSubmit }>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-lg-offset-2 col-lg-8">
          <TherapyTextField
            floatingLabelText="First Name"
            errorText={ errors.firstName }
            fullWidth={ true }
            onChange={(evt) => handleChange('firstName', evt.target.value) } />
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-offset-2 col-lg-8">
          <TherapyTextField
            floatingLabelText="Last Name"
            errorText={ errors.lastName }
            fullWidth={ true }
            onChange={(evt) => handleChange('lastName', evt.target.value) } />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-lg-offset-2 col-lg-8">
          <TherapyTextField
            floatingLabelText="Email"
            type="email"
            errorText={ errors.email }
            fullWidth={ true }
            onChange={(evt) => handleChange('email', evt.target.value) } />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-lg-offset-2 col-lg-8">
          <TherapyTextField
            floatingLabelText="Patient ID"
            errorText={ errors.patientId }
            fullWidth={ true }
            onChange={(evt) => handleChange('patientId', evt.target.value) } />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <TherapyRaisedButton
          label="Create"
          type="submit" />
      </div>
    </form>
  </div>
)
