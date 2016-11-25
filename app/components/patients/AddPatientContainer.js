import React from 'react';
import { connect } from 'react-redux';
import AddPatient from './AddPatient';
import { createPatient } from '../../reducers/patients'

const initialState = {
  firstName: '', lastName: '', email: '', patientId: '', errors: {}
};

const AddPatientDecorator = AddPatient => {
  return class StatefulAddPatient extends React.Component {
    constructor(props) {
      super(props);
      this.state = initialState;
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Update changed field and reset potential corresponding error
    handleChange(field, value) {
      let newState = {};
      newState[field] = value;
      if (this.state.errors[field]) {
        let newErrs = this.state.errors;
        delete newErrs[field]
        newState.errors = newErrs;
      }
      this.setState(newState);
    }

    handleSubmit(evt) {
      evt.preventDefault();
      // Check for errors
      const errs = this.validate();
      this.setState({ errors: errs })

      // If no errors, attempt to submit
      if (!Object.keys(errs).length) {
        const newPatient = this.state;
        newPatient.therapistId = this.props.user.id;
        this.props.addPatient(newPatient, (err) => {
          let newState = err ? { errors: {submit: err} } : initialState;
          this.setState(newState);
        });
      } else
        console.error(errs);
    }

    // Ensure the proper form fields are valid
    validate() {
      let errs = {};
      if (!this.state.firstName) errs.firstName = 'This field is required';
      if (!this.state.lastName) errs.lastName = 'This field is required';
      if (!this.state.email) errs.email = 'This field is required';
      if (!this.state.patientId) errs.patientId = 'This field is required';
      return errs;
    }

    render() {
      return (
        <AddPatient
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      )
    }
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchtoProps = dispatch => ({
  addPatient: (patient, displayErr) => dispatch(createPatient(patient, displayErr))
})

export default connect(mapStateToProps, mapDispatchtoProps)
  (AddPatientDecorator(AddPatient));
