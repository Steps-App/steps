// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deleteExercise } from '../../reducers/exercises'
import InfoItem from '../widgets/InfoItem'
import AddExerciseContainer from './AddExerciseContainer'
//Material UI
import { Divider, IconButton, FontIcon} from 'material-ui'

import { StepsRaisedButton, StepsActionButton } from '../material-style'
import { textDark, errorText } from '../colors';

import ConfirmDialog from '../widgets/ConfirmDialog';


// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-


export class ExerciseList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      confirmOpen: false,
      exerciseId: "",
      userId: ""
    }
    this.dialogClose = this.dialogClose.bind(this);
    this.dialogOpen = this.dialogOpen.bind(this);
  }

  dialogClose(){
    this.setState({confirmOpen: false, exerciseId : "", userId : ""});
  }

  dialogOpen(userId,exerciseId){
    this.setState({confirmOpen: true, exerciseId : exerciseId, userId : userId });
  }

render() {
    const { user, exercises, deleteExercise } = this.props;

    return (

      <div id="exercise-list" >
        <Helmet title="Exercises" />
        <h1 className="page-header">Exercises</h1>

        <AddExerciseContainer user={user} />
        <hr/>

        <div className="exercise-rows">
          {
            exercises && exercises.sort((a, b) => {
              if (b.title.toLowerCase() < a.title.toLowerCase()) return 1;
              else if (b.title.toLowerCase() > a.title.toLowerCase()) return -1;
              else return 0;
            }).map( exercise => {
              return (
                <div>
                  <div key={ exercise.id } className="exercise">
                    <div id="exercise-img">
                      <img src={exercise.img_url} className="img-responsive"></img>
                    </div>
                    <div id="exercise-info">
                      <h3 id="exercise-title">{ exercise.title }</h3>
                      <p id="exercise-description"> {exercise.description }</p>
                    </div>
                    <div id="exercise-remove">
                      <StepsActionButton mini={ true }
                        backgroundColor={ errorText }
                        onTouchTap={ () => this.dialogOpen(user.id, exercise.id) } >
                        <FontIcon className={'material-icons'}>clear</FontIcon>
                      </StepsActionButton>
                    </div>
                  </div>
                  <Divider />
                </div>
                )})
          }
          <ConfirmDialog
            title="Confirm Exercise Deletion"
            isOpen={ this.state.confirmOpen }
            confirm={ () => deleteExercise(this.state.userId, this.state.exerciseId) }
            dialogClose={ this.dialogClose }>
            {`Would you like to permenantly delete this exercise?`}
          </ConfirmDialog>
      </div>
    </div>
    )
  }
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({user, exercises }) => ({user, exercises })

const mapDispatchtoProps = dispatch => ({
  createExercise : (newExercise) => dispatch(createExercise(newExercise)),
  deleteExercise : (userId, exerciseId) => dispatch(deleteExercise(userId, exerciseId))
})

export default connect(mapStateToProps, mapDispatchtoProps)(ExerciseList);
