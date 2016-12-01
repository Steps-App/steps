import React from'react';
import { connect } from 'react-redux';
import AddExercise  from './AddExercise';
import { addExercise } from '../../reducers/exercises'

const initialState = {
  open: false, title: '', img_url: '', description: '', vid_url: '' , errors: {}
}

function AddExerciseDecorator (AddExercise) {
  return class StatefulAddExercise extends React.Component {
    constructor(props) {
      super(props) 
      this.state = initialState;
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


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

    validate() {
      let errs = {};
      if (!this.state.title) errs.title = 'This field is required';
      if (!this.state.description) errs.description = 'This field is required';
      if (!this.state.img_url) errs.img_url = 'This field is required';
      return errs;
    }

    handleSubmit (evt) {
      evt.preventDefault();
      const errs = this.validate();
      this.setState({ errors: errs })
      if (!Object.keys(errs).length) {
        this.props.addExercise(this.props.user.id, this.state)
        this.setState(initialState);
      }
      else
        console.error(errs);
    }

    render() {
      return (
        <AddExercise
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          { ...this.state }
        />
      )
    }
  }
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

//const mapStateToProps = ({user}) => ({user})

const mapDispatchToProps = dispatch => ({
  addExercise: (userId, data) => {
    dispatch(addExercise(userId, data));
  }
});

export default connect(null, mapDispatchToProps)(AddExerciseDecorator(AddExercise));
