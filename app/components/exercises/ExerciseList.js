// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deleteExercise } from '../../reducers/exercises'
import InfoItem from '../widgets/InfoItem'
import AddExerciseContainer from './AddExerciseContainer'
//Material UI
import { Table, TableHeader, TableHeaderColumn,
         TableBody, TableRow, TableRowColumn,Divider, TableFooter, IconButton, FontIcon} from 'material-ui'

import { StepsRaisedButton, StepsActionButton } from '../material-style'
import { textDark, errorText } from '../colors';


// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

const ExerciseList = ({ user, exercises, deleteExercise }) => (
  <div id="exercise-list" >
    <Helmet title="Exercises" />
    <h1 className="page-header">Exercises</h1>
    
    <AddExerciseContainer user={user} /> 
    <hr/>

    <div className="table">
    <Table style={{backgroundColor:'none'}} >
      <TableBody displayRowCheckbox={false}>
      {
        exercises && exercises.sort((a, b) => {
          if (b.title.toLowerCase() < a.title.toLowerCase()) return 1;
          else if (b.title.toLowerCase() > a.title.toLowerCase()) return -1;
          else return 0;
        }).map( exercise =>
          <TableRow key={ exercise.id } selectable={false} className="exercise-row">
            <TableRowColumn style={{"paddingBottom":"1em", "paddingTop": "1em", width: "15em"}}>
              <img src={exercise.img_url}></img>
            </TableRowColumn>
            <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}} >
              <div className="exercise-data">
                <h3>{exercise.title}</h3>
                <InfoItem icon="description" label="Description"  content={exercise.description}/>
              </div>
            </TableRowColumn>
            <TableRowColumn style={{width:"10px", "paddingRight": "8em"}}>
                <StepsActionButton mini={ true }
                  backgroundColor={ errorText }
                  onTouchTap={ () => deleteExercise(user.id, exercise.id) } >
                  <FontIcon className={'material-icons'}>clear</FontIcon>
                </StepsActionButton>
            </TableRowColumn>
          </TableRow>
        )
      }
      </TableBody>
    </Table>
    </div>
  </div>
)

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({user, exercises }) => ({user, exercises })

const mapDispatchtoProps = dispatch => ({
  createExercise : (newExercise) => dispatch(createExercise(newExercise)),
  deleteExercise : (userId, exerciseId) => dispatch(deleteExercise(userId, exerciseId))
})

export default connect(mapStateToProps, mapDispatchtoProps)(ExerciseList);
