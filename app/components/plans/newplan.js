//React&Redux
import React from 'react';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router'
//Stateless Components
import PlanOptions from './newPlanOptions';
import PatientPanel from './patientPanel';
import Treatment from './treatment';
import CreatedTreatments from './createdTreatments';

//material-ui
import { StepsSelectField, StepsMenuItem, StepsRaisedButton, StepsFlatButton } from '../material-style';
import { Divider, FloatingActionButton } from 'material-ui';

// Styles
//== Exerise SelectField Style
const styleRow = {
  'display' : 'flex',
  'marginTop' : '1em'
};

// Initial Treatment Template for reseting
const initialTreatment = {
  time_per_exercise: '',
  reps: '',
  sets: '',
  resistance: '',
  notes: ''
};

const initialState = {
  duration : 0,
  therapyFocus : "",
  notes : "",
  selectedExercise : {},
  treatment: initialTreatment,
  treatments : [],
  treatmentErrors: {},
  planErrors: {}
};

//=======  Component==========
export default class newPlan extends React.Component{
  constructor(props){
    super(props);

    this.state = Object.keys(this.props.plan).length ? {
      duration: this.props.plan.duration,
      therapyFocus: this.props.plan.therapyFocus,
      notes: this.props.plan.notes,
      selectedExercise: {},
      treatment: initialTreatment,
      treatments: this.props.plan.treatments,
      planErrors: {},
      treatmentErrors: {}
    } : initialState

    this.durationOnChange = this.durationOnChange.bind(this);
    this.therapyHandler = this.therapyHandler.bind(this);
    this.exerciseOnChange = this.exerciseOnChange.bind(this);
    this.resistanceOnChange = this.resistanceOnChange.bind(this);
    this.notesOnChange = this.notesOnChange.bind(this);
    this.treatmentHandler = this.treatmentHandler.bind(this);
    this.treatmentValidate = this.treatmentValidate.bind(this);
    this.clearPlanError = this.clearPlanError.bind(this);
    this.planValidate = this.planValidate.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.addNewTreatment = this.addNewTreatment.bind(this);
    this.removeTreatment = this.removeTreatment.bind(this);
  }
//==== Plan Option Handlers
// persisting on local state for plan for duration and injury
  durationOnChange(evt, idx, value) {
    this.clearPlanError('duration')
    this.setState({ duration: value });
  }

//onchange handler for therapyFocus
  therapyHandler(evt) {
    this.clearPlanError('therapyFocus')
    this.setState({ therapyFocus : evt.target.value});
  }

//onchange handler for PlanNotes
  notesOnChange(evt) {
    this.setState({ notes : evt.target.value});
  }
// Treatment Handlers
// handle change to this.state.exercise
  exerciseOnChange(evt, idx) {
    this.clearPlanError('selectedExercise')
    this.setState({ selectedExercise: this.props.exercises[idx] });
  }
// handle change to resistance selector
  resistanceOnChange(evt, idx, value) {
    let newProperty = Object.assign({}, this.state.treatment, {resistance: value})
    if (this.state.treatmentErrors['resistance']){
      let newErrs = this.state.treatmentErrors
      delete newErrs['resistance']
      newProperty.treatmentErrors = newErrs;
    }
    this.setState({ treatment: newProperty })
  }

// Handler for this.state.treatments // all states within
  treatmentHandler(field, value) {
    let newProperty = {[field] : value}
    if (this.state.treatmentErrors[field]){
      let newErrs = this.state.treatmentErrors
      delete newErrs[field]
      newProperty.treatmentErrors = newErrs;
    }
    let newTreatment = Object.assign({}, this.state.treatment, newProperty); // merges old state with changes
    this.setState({ treatment : newTreatment });
  }

  // Ensure the proper form fields are valid
  treatmentValidate() {
    let errs = {};
    if (!this.state.treatment.time_per_exercise) errs.time_per_exercise = 'This field is required';
    if (!this.state.treatment.reps) errs.reps = 'This field is required';
    if (!this.state.treatment.sets) errs.sets = 'This field is required';
    if (!this.state.treatment.resistance) errs.resistance = 'This field is required';
    return errs;
  }

  clearPlanError(field) {
    if (this.state.planErrors[field]) {
      let newErrors = this.state.planErrors
      delete newErrors[field]
      this.setState({ planErrors: newErrors })
    }
  }

  planValidate() {
    let errs = {}
    if (!this.state.duration) errs.duration = 'This field is required'
    if (!this.state.therapyFocus) errs.therapyFocus = 'This field is required'
    if (!this.state.treatments[0] && !this.state.selectedExercise.exercise_id) errs.selectedExercise = 'This field is required'
    return errs
  }

// ======= addNewTreatment Button==========
  addNewTreatment() {
    const errs = this.treatmentValidate();  // validate fields
    this.setState({ treatmentErrors: errs })  // add to state

    if (!Object.keys(errs).length) {  // if no errors, create treatment
      let treatment = {
        time_per_exercise: (this.state.treatment.time_per_exercise * 60),
        reps: this.state.treatment.reps,
        sets: this.state.treatment.sets,
        resistance: this.state.treatment.resistance,
        notes: this.state.treatment.notes,
        exercise_id: this.state.selectedExercise.id,
        patient_id: this.props.currentPatient.id
      }

      if (this.state.treatments.length === 0) {  // if first treatment
        this.setState({ treatments: [treatment] });
      } else {
        let newTreatmentArray = this.state.treatments.concat(treatment); // if not
        this.setState({ treatments : newTreatmentArray});
      }
      this.setState({ treatment: initialTreatment }); //resets treatment form
      this.setState({ selectedExercise: {} }); // clears this.state.selectedExercise
    } else {
      console.log(errs) // if errors, console.log instead of creating treatment
    }
  }

// ======= removeTreatment =======
  removeTreatment(idx) {
    console.log(idx);
    let newTreatmentArray = this.state.treatments.filter((treatment,index)=> {
      if (idx !== index) return treatment;
    });
    console.log(newTreatmentArray);
    this.setState({ treatments: newTreatmentArray});
  }

//===== SubmitHandler for Entire Plan ======
  submitHandler(evt) {
    evt.preventDefault();
    const errs = this.planValidate()          // validate fields
    this.setState({ planErrors: errs })  // add to state

    if (!Object.keys(errs).length) {    // if no errors, create plan
      let newPlan = {
        duration : this.state.duration,
        therapyFocus : this.state.therapyFocus,
        notes : this.state.notes,
        patient_id: this.props.currentPatient.id,
        treatments: this.state.treatments
      };

      this.props.addPlan(newPlan);
      browserHistory.push(`/patients/${this.props.currentPatient.id}/plans/confirmation`)
    }
  }

// -=-=-=-=-=-=-=-=-=-=-= Component Starts Here -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  render(){
  // === IF Therapist has no exercises displays text instead of dropdown
    let ExerciseList = (this.props.exercises.length > 0) ?
                  <StepsSelectField
                    floatingLabelText="Exercise"
                    errorText={this.state.planErrors.selectedExercise}
                    value={this.state.selectedExercise.title}
                    onChange={this.exerciseOnChange}
                    maxHeight={200}
                  >
                    {this.props.exercises.map((exercise, idx) => {
                      return ( <StepsMenuItem key={exercise.id} value={exercise.title} primaryText={exercise.title} /> );
                    })}
                  </StepsSelectField>
                  : <h4> Add Exercises to create Treatments </h4>;
  // === IF this.selectedExercise is an empty object form is not shown
    let TreatmentForm = (Object.keys(this.state.selectedExercise).length === 0) ? <h5> Please Select an Exercise</h5> :
                <Treatment
                  exercise={this.state.selectedExercise}
                  treatment={this.state.treatment}
                  resistanceOnChange={this.resistanceOnChange}
                  addTreatment={this.addNewTreatment}
                  treatmentHandler={this.treatmentHandler}
                  treatmentErrors={this.state.treatmentErrors}
                />;

    return(
      <div className="container">
        <Helmet title="New Plan" />
        <h1 className="page-header">New Plan</h1>
        <div className='row' id="newPlan">
          <div className='col-md-10'>
          <form onSubmit={this.submitHandler}>
            <PlanOptions
              durationOnChange={this.durationOnChange}
              therapyHandler={this.therapyHandler}
              notesOnChange={this.notesOnChange}
              note={this.state.notes}
              duration={this.state.duration}
              therapyFocus={this.state.therapyFocus}
              planErrors={this.state.planErrors}
            />
            <div className="row" style={styleRow}>
              <div className="col-md-4">
                {ExerciseList}
              </div>
              </div>
                {TreatmentForm}
              <div>
              <div>
                <Divider/>
              </div>
              <h4 style={{"display" : "center"}}> Patient Treatments </h4>
              <CreatedTreatments
                exercises={this.props.exercises}
                treatments={this.state.treatments}
                removeTreatment={this.removeTreatment}
              />
            </div>
          </form>
          </div>

          <div className='col-md-2'>
            <div className="row">
              <PatientPanel patient={this.props.currentPatient} />
            </div>
            <div className="row">
              <div>
                <StepsRaisedButton primary={true}
                  type="submit"
                  label="Create Plan"
                  style={{width: '100%'}}
                  onClick={this.submitHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
