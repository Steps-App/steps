// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deleteExercise } from '../../reducers/exercises'
import InfoItem from '../widgets/InfoItem'
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
          <div  className="exercisebt">
          <StepsRaisedButton
            label="Remove"
            backgroundColor="#D9534F"
            onClick={this.showRemove}
          />
          <StepsRaisedButton
            label="Add"
            backgroundColor="#005B96"
              />
            </div>

          <Divider/>

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
                      <InfoItem icon="fitness_center" label="Title"  content={exercise.title}/>
                        { this.state.showRemove ?
                          <IconButton id="remove" tooltip="Permanent" iconClassName="material-icons" onClick={() => deleteExercise(user.id, exercise.id)}>
                          highlight_off
                          </IconButton> : null
                        }
                      </div>
                      <div className="exercise-description">
                        <InfoItem icon="description" label="Description"  content={exercise.description}/>
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
