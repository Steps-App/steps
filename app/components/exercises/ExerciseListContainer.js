// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deleteExercise } from '../../reducers/exercises'

//Material UI
import { Table, TableHeader, TableHeaderColumn,
         TableBody, TableRow, TableRowColumn, TableFooter} from 'material-ui'

import { StepsRaisedButton } from '../material-style'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class ExerciseList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const {user, exercises, deleteExercise } = this.props;

    return (
     
      <div id="exercise-list" className="col-xs-12">
          <Helmet title="Exercise List" />
          <h1 className="page-header">Exercise List</h1>
  
          <StepsRaisedButton
            label="Add New Exercise"
            backgroundColor="#005B96"
            labelStyle={{color: 'white'}}
            style={{marginBottom: '20px', float: 'right'}}
              />
          <div className="table">
          <Table style={{backgroundColor:'none'}} >
            <TableBody displayRowCheckbox={false}>
            {
              exercises && exercises.map( exercise =>
                <TableRow key={ exercise.id } selectable={false}>
                    <TableRowColumn style={{ width: "30%" }}>
                      <img className="img-responsive" src={exercise.img_url}></img>
                    </TableRowColumn>
                    <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}} >
                        <p style={{fontWeight: "bold", fontSize: "larger" }}>{`${exercise.title}`}</p>
                        <p><span style={{fontWeight: "bold"}}>Description</span>{`: ${exercise.description}`}</p>
                      </TableRowColumn>
                    <TableRowColumn >
                        <StepsRaisedButton
                          label="Delete"
                          backgroundColor="#ff0000"
                          labelStyle={{color: 'white'}}
                          onClick={() => deleteExercise(user.id, exercise.id)}
                        />
                    </TableRowColumn>
                </TableRow>
              )
            }
           </TableBody>
          </Table>
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







