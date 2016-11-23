//React/Redux
import React from 'react';
import {connect} from 'react-redux';
//Components
import PlanOptions from './newPlanOptions';
import PatientPanel from './PatientPanel';
import TreatmentRows from './treatmentRows';
import TreatmentForm from './createTxForm';

//material-ui
import {DropDownMenu, MenuItem, Divider, FloatingActionButton, TextField, SelectField, Link,Paper} from 'material-ui';
import {Table, TableHeader, TableRow,TableHeaderColumn, TableRowColumn} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';


//======FAKE DATA ============
const fakeExerciseArray = [{
  "id" : 1,
  "title" : "Horizontal Abduction",
  "description" : " Start by lying on your stomach and your arm dangling",
  "img_URL" : "http://www.stellarhealthcenter.com/Exercises=Stretch/resized/Shoulder-Prone-Horizontal-Abduction.jpg",
  "vid_url" : ""
 },
 {
   "id" : 2,
   "title" : "Wall or Table Push Up",
   "description" : "To do this correctly, raise your arms up in front of you so your arms are even with the ground. Then try and make your arms a little longer by bringing your shoulders forward. This is the +, it is what you want to feel at the end each push up.",
   "img_URL" : "http://www.stellarhealthcenter.com/Exercises=Stretch/resized/shoulder-wall-push-up-start.jpg",
   "vid_url" : ""
  },
  { "id" : 3,
    "title" : "Prone External Rotation",
    "description" : "Start by lying on your stomach and your arm dangling",
    "img_URL" : "../../../src/images/defaultProfile.png",
    "vid_url" : ""
  }
];


const fakePatient = {
  id : 1,
  first_name : "John",
  last_name : "doe",
  img_url : "",
  email : "johndoe@gmail.com",
  DOB : 'DEC 10 1989',
  gender : 'M'
};
//========Treatment Array==========

let treatmentArray = [];

//=======  Component===============
class newPlan extends React.Component{
  constructor(props){
    console.log(props);
    super(props);

    this.state={
      formOpen: false,
      duration : 1,
      injury : null,
      exercise: null,
      notes : "",
      exercises : [],
      treatments : []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.noteHandler = this.noteHandler.bind(this);
    this.addNewTreatment = this.addNewTreatment.bind(this);
    this.removeTreatment = this.removeTreatment.bind(this);
  }

// persisting on local state for plan for duration and injury
  handleChange(field, value){
    this.setState({[field]:value});
  }
//onchange handler for PlanNotes
  noteHandler(evt){
    this.setState({notes : evt.target.value});
  }

//setting all local state and submit entire plan
  submitHandler(evt){

  }
//Treatment Handlers
  formToggler(){
    if(this.formOpen) this.setState({formOpen:false});
    else this.setState({formOpen:true});
  }

  addNewTreatment(){

  }

  removeTreatment(){

  }

  render(){
//========Temporary Styles ===========
    const style = {
      marginRight: 20,
    };
//====================================

// ========Exercise Drop Down ============
    let exercises = [];
    fakeExerciseArray.map((exercise) => {
      exercises.push(<MenuItem key={exercise.id} value={exercise.id} primaryText={exercise.title}/>
                    );
    });
//=========== Component ==================
    return(
      <div className="container">
        <div className='row' id="newPlan">
          <div className='col-md-10'>
              <PlanOptions handleChange={this.handleChange} noteHandler={this.noteHandler}
               note={this.state.notes} duration={this.state.duration} injury={this.state.injury}/>

              <div>
                <div className="row">
                  <div className="col-md-6">
                  <SelectField maxHeight={200} value={this.state.exercise} floatingLabelText="Exercise"onChange={this.handleChange}>
                    {exercises}
                    </SelectField>
                  </div>
                  <div className="col-md-6">
                    <FloatingActionButton mini={true} style={style} onClick={this.addNewTreatment}>
                      <ContentAdd className="add-exercise"/>
                    </FloatingActionButton>
                  </div>
                </div>
              </div>

                <TreatmentForm/>


              <div className="row">
                <div className="col-md-12">
                  <Table>
                    {treatmentArray}
                  </Table>
                </div>
              </div>
          </div>



          <div className='col-md-2'>
            <PatientPanel patient={fakePatient}/>
          </div>

        </div>
      </div>
    );
  }




}


//========Container =============== Temporary :D =========

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(newPlan);
