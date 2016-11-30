// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deleteExercise } from '../../reducers/exercises'

//Material UI
import { Table, TableHeader, TableHeaderColumn,
         TableBody, TableRow, TableRowColumn, TableFooter, IconButton, FontIcon} from 'material-ui'

import { StepsRaisedButton } from '../material-style'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class ExerciseList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showRemove :false
    }
    this.showRemove = this.showRemove.bind(this);

  }

  showRemove (){
    this.setState({showRemove:!this.state.showRemove});
  }

  render() {

    const {user, exercises, deleteExercise } = this.props;

    return (

      <div id="exercise-list" >
          <Helmet title="Exercise List" />
          <h1 className="page-header">Exercise List</h1>
          <div>
          <StepsRaisedButton
            label="Delete"
            backgroundColor="#D9534F"
            labelStyle={{color: 'white'}}
            onClick={this.showRemove}
          />
          <StepsRaisedButton
            label="Add New Exercise"
            backgroundColor="#005B96"
            labelStyle={{color: 'white'}}
            style={{marginBottom: '20px', float: 'right'}}
              />
            </div>
          <div className="table">
          <Table style={{backgroundColor:'none'}} >
            <TableBody displayRowCheckbox={false}>
            {
              exercises && exercises.map( exercise =>
                <TableRow key={ exercise.id } selectable={false}>
                    <TableRowColumn>
                      <img src={exercise.img_url}></img>
                    </TableRowColumn>
                    <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}} >
                      <div className="exercise-title">
                        <h3 className="col-md-6" >{exercise.title}</h3>

                        <IconButton id={this.state.showRemove ? "show" : "remove"} tooltip="Permanent" iconClassName="material-icons" onClick={() => deleteExercise(user.id, exercise.id)}>
                          highlight_off
                        </IconButton>
                      </div>
                      <div className="exercise-description">
                        <p><span style={{fontWeight: "bold"}}>Description</span>{`: ${exercise.description}`}</p>

                      </div>
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
