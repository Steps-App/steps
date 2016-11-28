//React&Redux
import React from 'react';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router'
//Stateless Components
import PlanOptions from './newPlanOptions';
import PatientPanel from './PatientPanel';
import Treatment from './treatment';
import CreatedTreatments from './createdTreatments';

//material-ui
import {StepsRaisedButton, StepsFlatButton} from '../material-style';
import {MenuItem, Divider, FloatingActionButton, SelectField, Link} from 'material-ui';

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
  treatments : []
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
      treatments: this.props.plan.treatments
    } : initialState

    this.durationOnChange = this.durationOnChange.bind(this);
    this.therapyHandler = this.therapyHandler.bind(this);
    this.exerciseOnChange = this.exerciseOnChange.bind(this);
    this.resistanceOnChange = this.resistanceOnChange.bind(this);
    this.notesOnChange = this.notesOnChange.bind(this);
    this.treatmentHandler = this.treatmentHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.addNewTreatment = this.addNewTreatment.bind(this);
    this.removeTreatment = this.removeTreatment.bind(this);
  }
//==== Plan Option Handlers
// persisting on local state for plan for duration and injury
  durationOnChange(evt, idx, value) {
    this.setState({ duration: value });
  }

//onchange handler for therapyFocus
  therapyHandler(evt) {
    this.setState({ therapyFocus : evt.target.value});
  }

//onchange handler for PlanNotes
  notesOnChange(evt) {
    this.setState({notes : evt.target.value});
  }
// Treatment Handlers
// handle change to this.state.exercise
  exerciseOnChange(evt, idx) {
    this.setState({ selectedExercise: this.props.exercises[idx] });
  }

  resistanceOnChange(evt, idx, value) {
    let newTreatment = Object.assign({}, this.state.treatment, {resistance: value})
    this.setState({ treatment: newTreatment })
  }

// Handler for this.state.treatments // all states within
  treatmentHandler(field, value) {
    let newProperties = {[field] : value} ;
    let newTreatment = Object.assign({},this.state.treatment, newProperties); //merges old state with changes
    this.setState( { treatment : newTreatment});
  }

// ======= addNewTreatment Button==========
  addNewTreatment() {
    let treatment = {
      time_per_exercise: this.state.treatment.time_per_exercise,
      reps: this.state.treatment.reps,
      sets: this.state.treatment.sets,
      resistance: this.state.treatment.resistance,
      notes: this.state.treatment.notes,
      exercise_id: this.state.selectedExercise.id,
      patient_id: this.props.currentPatient.id
    };

    if (this.state.treatments.length === 0) {
      this.setState({ treatments: [treatment] });
    } else {
      let newTreatmentArray = this.state.treatments.concat(treatment);
      this.setState({ treatments : newTreatmentArray});
    }
    this.setState({ treatment: initialTreatment }); //resets treatment form
    this.setState({ selectedExercise: {} }); // clears this.state.selectedExercise
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
    let newPlan = {
      duration : this.state.duration,
      therapyFocus : this.state.therapyFocus,
      notes : this.state.notes,
      patient_id: this.props.currentPatient.id,
      treatments: this.state.treatments
    };
    console.log(newPlan)
    this.props.addPlan(newPlan);
    browserHistory.push(`/patients/${this.props.currentPatient.id}/plans/confirmation`)
  }

// -=-=-=-=-=-=-=-=-=-=-= Component Starts Here -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  render(){
  // === IF Therapist has no exercises displays text instead of dropdown
    let ExerciseList = (this.props.exercises.length > 0) ?
                  <SelectField
                    floatingLabelText="Exercise"
                    value={this.state.selectedExercise.title}
                    onChange={this.exerciseOnChange}
                    maxHeight={200}>
                    {this.props.exercises.map((exercise, idx) => {
                        return ( <MenuItem key={exercise.id} value={exercise.title} primaryText={exercise.title} /> );
                      })}
                  </SelectField>
                  : <h4> Add Exercises to create Treatments </h4>;
  // === IF this.selectedExercise is an empty object form is not shown
    let TreatmentForm = (Object.keys(this.state.selectedExercise).length === 0) ? <h5> Please Select an Exercise</h5> :
                <Treatment
                  exercise={this.state.selectedExercise}
                  treatment={this.state.treatment}
                  resistanceOnChange={this.resistanceOnChange}
                  addTreatment={this.addNewTreatment}
                  treatmentHandler={this.treatmentHandler}
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
