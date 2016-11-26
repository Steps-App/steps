//React&Redux
import React from 'react';
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

// Initial Treatment Templete for reseting
const initialTreatment = {
  time_per_exercise: '',
  reps: '',
  sets: '',
  resistance: '',
  notes: ''
};


//=======  Component==========
export default class newPlan extends React.Component{
  constructor(props){
    console.log(props);
    super(props);

    this.state={
      duration : 0,
      therapy_focus : "",
      notes : "",
      selectedExercise : {},
      treatment: initialTreatment,
      treatments : []
    };

    this.durationOnChange = this.durationOnChange.bind(this);
    this.therapyHandler = this.therapyHandler.bind(this);
    this.exerciseOnChange = this.exerciseOnChange.bind(this);
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

//onchange handler for therapy_focus
  therapyHandler(evt) {
    this.setState({ therapy_focus : evt.target.value});
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
      therapy_focus : this.state.therapy_focus,
      notes : this.state.notes,
      patient_id: this.props.currentPatient.id,
      treatments: this.state.treatments
    };
    console.log(`submitHandler ${newPlan}`);
    this.props.addPlan(newPlan);
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
                  addTreatment={this.addNewTreatment}
                  treatmentHandler={this.treatmentHandler}
                />;

    return(
      <div className="container">
        <div className='row' id="newPlan">
          <div className='col-md-10'>
          <form onSubmit={this.submitHandler}>
            <PlanOptions
              durationOnChange={this.durationOnChange}
              therapyHandler={this.therapyHandler}
              notesOnChange={this.notesOnChange}
              note={this.state.notes}
              duration={this.state.duration}
              therapy_focus={this.state.therapy_focus}
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
                onClick={this.submitHandler} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
