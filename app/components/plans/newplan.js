//React/Redux
import React from 'react';
import {connect} from 'react-redux';
//Components
import PlanOptions from './newPlanOptions';

//material-ui
import {DropDownMenu, MenuItem, Divider, FloatingActionButton, TextField, SelectField, Link} from 'material-ui';
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
    "img_URL" : "",
    "vid_url" : ""
  }
];
//========Treatment Array==========

let treatmentTableRows = [];

//=======  Component===============
class newPlan extends React.Component{
  constructor(props){
    console.log(props);
    super(props);

    this.state={
      patient : {},
      duration : 1,
      injury : null,
      notes : "",
      exercise: null,
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
//
  addNewTreatment(){
      treatmentTableRows.push(
        <TableRow>
          <TableRowColumn><Link to='treatment'><img src='../../../src/images/defaultexercise.jpeg'></img></Link></TableRowColumn>
          <TableRowColumn>
            <form>
              <TextField hintText="Title"/><br/>
              <TextField hintText="description" multiLine={true} /><br/>
              <TextField hintText="Additional Notes" multiLine={true} /><br/>
            </form>
          </TableRowColumn>
          <TableRowColumn>
          </TableRowColumn>
        </TableRow>
    );
  }

  removeTreatment(){

  }


  render(){
// =======Temporary Styles ===========
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
      <form className="container">
        <div className='row' id="newPlan">
          <div className='col-md-8'>
              <PlanOptions handleChange={this.handleChange}     noteHandler={this.noteHandler} note={this.state.notes} duration={this.state.duration} injury={this.state.injury}/>
            <div>
              <div>
                <SelectField maxHeight={200} value={this.state.exercise} floatingLabelText="Exercise"onChange={this.handleChange}>
                  {exercises}
                </SelectField>
              </div>

              <div>
                <FloatingActionButton mini={true} style={style} onClick={this.addNewTreatment}>
                  <ContentAdd className="add-exercise"/>
                </FloatingActionButton>
              </div>
            </div>


            <Table>
              {treatmentTableRows}
            </Table>

          </div>


          <div className='col-md-4'>
              <div> Patient Photo</div>
          </div>

         </div>
        </form>
    );
  }




}


//========Container =============== Temporary

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(newPlan);
