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
          
          <AddExerciseContainer user={user} />
          
          <hr/>

          <div className="table">
          <Table style={{backgroundColor:'none'}} >
            <TableBody displayRowCheckbox={false}>
            {
              exercises && exercises.map( exercise =>
                <TableRow key={ exercise.id }  selectable={false}>
                    <TableRowColumn style={{"padding-bottom":"1em", "padding-top": "1em", width: "15em"}}>
                      <img src={exercise.img_url}></img>
                    </TableRowColumn>
                    <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}} >
                      <div className="exercise-title">
                      <h3>{exercise.title}</h3>
                      </div>
                      <div className="exercise-description">
                        <InfoItem icon="description" label="Description"  content={exercise.description}/>
                      </div>
                    </TableRowColumn>
                    <TableRowColumn style={{width:"10px", "padding-right": "8em"}}>
                        <FontIcon
                          className="material-icons md-25"
                          style={{color: 'red'}}
                          onClick={() => deleteExercise(user.id, exercise.id)}>
                          remove_circle_outline
                        </FontIcon>
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
