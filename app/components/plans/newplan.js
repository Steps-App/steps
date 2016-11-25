//React/Redux
import React from 'react';
//Stateless Components
import PlanOptions from './newPlanOptions';
import PatientPanel from './PatientPanel';
import Treatment from './treatment';
import CreatedTreatments from './createdTreatments';

//material-ui
import {StepsRaisedButton, StepsFlatButton} from '../material-style';
import {DropDownMenu, MenuItem, Divider, FloatingActionButton, TextField, SelectField, Link,Paper} from 'material-ui';
import {RaisedButton, Table, TableHeader, TableRow,TableHeaderColumn, TableRowColumn} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

// styling
const styleRow = {
  'display' : 'flex',
  'marginTop' : '1em'
};

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
    this.noteHandler = this.noteHandler.bind(this);
    this.exerciseOnChange = this.exerciseOnChange.bind(this);
    this.notesOnChange = this.notesOnChange.bind(this);
    this.treatmentHandler = this.treatmentHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.addNewTreatment = this.addNewTreatment.bind(this);
    this.removeTreatment = this.removeTreatment.bind(this);
  }

// persisting on local state for plan for duration and injury
  durationOnChange(evt, idx, value) {
    this.setState({ duration: value });
  }

//onchange handler for therapy_focus
  therapyHandler(evt) {
    this.setState({therapy_focus : evt.target.value});
  }

//onchange handler for PlanNotes
  noteHandler(evt) {
    this.setState({notes : evt.target.value});
  }

// handle change to this.state.exercise
  exerciseOnChange(evt, idx) {
    this.setState({ selectedExercise: this.props.exercises[idx] });
  }

  notesOnChange(evt) {
    this.setState({ treatment: { notes: evt.target.value }});
  }

// treatment handler for this.state.treatment
  treatmentHandler(field, value) {
    this.setState({ treatment :{[field]: value }});
  }

// ======= addNewTreatment =======
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
    this.setState({ treatment: initialTreatment });
    this.setState({ selectedExercise: { title:" ", description: " "} });

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


  render(){

    let ExerciseList = (Array.isArray(this.props.exercises)) ?                 <SelectField floatingLabelText="Exercise" value={this.state.selectedExercise.title} onChange={this.exerciseOnChange} maxHeight={200}>
                      {this.props.exercises.map((exercise, idx) => {
                        return ( <MenuItem key={exercise.id} value={exercise.title} primaryText={exercise.title} /> );
                      })}
                    </SelectField> : <h4> No Exercises Added Yet! </h4> ;

    return(
      <div className="container">
        <div className='row' id="newPlan">
          <div className='col-md-10'>
          <form onSubmit={this.submitHandler}>
            <PlanOptions
              durationOnChange={this.durationOnChange}
              therapyHandler={this.therapyHandler}
              noteHandler={this.noteHandler}
              note={this.state.notes}
              duration={this.state.duration}
              therapy_focus={this.state.therapy_focus}
            />
            <div className="row" style={styleRow}>
              <div className="col-md-4">
                  {ExerciseList}
              </div>
            </div>
             <Treatment
              exercise={this.state.selectedExercise}
              treatment={this.state.treatment}
              addTreatment={this.addNewTreatment}
              notesOnChange={this.notesOnChange}
              treatmentHandler={this.treatmentHandler}
            />
            <div>
            <h4> Patient Treatments </h4>
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
                <RaisedButton primary={true} type="submit" label="Create Plan" style={{width: '100%'}} onClick={this.submitHandler} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
