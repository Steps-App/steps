import React from 'react';
import {connect} from 'react-redux';
import {DropDownMenu, MenuItem, Divider, FloatingActionButton} from 'material-ui';
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
//============================
//=======  Component==========
class newPlan extends React.Component{
  constructor(props){
    console.log(props);
    super(props);

    this.state={
      patient : {},
      duration : 1,
      injury : null,
      notes : null,
      exercise: "",
      exercises : []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  // persisting on local state
  handleChange(evt,index, value){

  }

  //submiting local state
  submitHandler(evt){

  }

  render(){


      let exercises = [];
      fakeExerciseArray.map((exercise) => {
        exercises.push(<MenuItem key={exercise.id} value={exercise.id} primaryText={exercise.title}/>
                      );
      });

      const style = {
          marginRight: 20,
      };

    return(
      <div className='row' id='container'>

        <section className='col-xs-12 col-lg-8'>
          <div className='row'>
            <span className='col-xs-12 col-md-8'>
              <DropDownMenu
              value={this.state.duration}
              onChange={this.handleChange}
              >
                <MenuItem value={1} primaryText=" 1 Week"/>
                <MenuItem value={2} primaryText=" 2 Week"/>
                <MenuItem value={3} primaryText=" 3 Week"/>
                <MenuItem value={4} primaryText=" 4 Week"/>
                <MenuItem value={5} primaryText=" 5 Week"/>
                <MenuItem value={6} primaryText=" 6 Week"/>
              </DropDownMenu>

            </span>
          </div>
          <div>
            <span>
              <DropDownMenu maxHeight={200} value={this.state.exercise} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="Exercises"/>
                  <Divider/>
                  {exercises}
              </DropDownMenu>
            </span>

            <span>
                <FloatingActionButton mini={true} style={style}>
                  <ContentAdd />
                </FloatingActionButton>
            </span>

          </div>

        </section>


        <section className='col-md-4'>


        </section>
      </div>
    );
  }




}


//========Container =============== Temporary

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(newPlan);
