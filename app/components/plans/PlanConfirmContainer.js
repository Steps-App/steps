// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';

//Material UI
import { Table, TableHeader, TableHeaderColumn,
         TableBody, TableRow, TableRowColumn, TableFooter, RaisedButton } from 'material-ui'

import {createPlan} from '../../reducers/plan';

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class PlanConfirm extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const { plan, currentPatient, exercises, createPlan } = this.props;

    return (
      <div id="patient-list" className="col-xs-12">
        <Helmet title="Confirm Plan" />
        <h1 className="page-header">Plan Confirmation</h1>
        <div id="treatmentsfinal" className="col-xs-10">
        <Table style={{backgroundColor:'none'}}>
          <TableBody displayRowCheckbox={false}>
          {
            plan.treatments && plan.treatments.map( treatment => {
              let exercise = exercises.filter(exercise => exercise.id === treatment.exercise_id)[0]
              return(
                <TableRow key={ treatment.exercise_id }>
                    <TableRowColumn style={{ width: "30%" }} >
                    <img className='img-responsive' src={exercise.img_url} />
                    </TableRowColumn>
                    <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}} >
                      <p style={{fontWeight: "bold", fontSize: "larger" }}>{`${exercise.title}`}</p>
                      <p><span style={{fontWeight: "bold"}} >Sets</span>{`: ${treatment.sets}`}  /
                      <span style={{fontWeight: "bold"}}>Reps</span>{`: ${treatment.reps}`}  /
                      <span style={{fontWeight: "bold"}}>Time</span>{`: ${treatment.time_per_exercise}`}  /
                      <span style={{fontWeight: "bold"}}>Resistance</span>{`: ${treatment.resistance}`}</p>
                      <p><span style={{fontWeight: "bold"}}>Description</span>{`: ${exercise.description}`}</p>
                      <p><span style={{fontWeight: "bold"}}>Notes</span>{`: ${treatment.notes}`}</p>
                    </TableRowColumn>
                </TableRow>
              )
            })
          }
         </TableBody>
        </Table>
      </div>
        <div className="sidepanel" className="col-xs-2" style={{paddingRight: "0px", fontSize: "smaller"}} >
          <div className="plan-details">
           <img style={{width: "auto", height: "auto", borderRadius: "50%", paddingBottom: "15px"  }} src={currentPatient.img_URL} />
           <p><span style={{fontWeight: "bold" }}>Patient Name</span>{`: ${currentPatient.first_name + " " + currentPatient.last_name  }`}</p>
           <p><span style={{fontWeight: "bold" }}>DOB</span>{`: ${currentPatient.DOB}`}</p>
           <p><span style={{fontWeight: "bold" }}>Gender</span>{`: ${currentPatient.gender}`}</p>
           <p><span style={{fontWeight: "bold" }}>Therapy Focus</span>{`: ${plan.therapyFocus}`}</p>
           <p><span style={{fontWeight: "bold" }}>Duration</span>{`: ${plan.duration}`}</p>
           <p><span style={{fontWeight: "bold" }}>Notes</span>{`: ${plan.notes}`}</p>
          </div>

          <RaisedButton
            label="Confirm"
            backgroundColor="#005B96"
            labelStyle={{color: 'white'}}
            onClick={() => createPlan(this.props.plan)}
          />
      <div className="divider" style={{ height:"15px"}} />

          <RaisedButton
            label="Edit"
            backgroundColor="#8D5300"
            labelStyle={{color: 'white'}}
            onClick={() => browserHistory.push(`/patients/${currentPatient.id}/plans/new`)}
          />

        </div>
      </div>
    )
  }
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ plan, currentPatient, exercises }) => ({ plan, currentPatient, exercises })

const mapDispatchtoProps = dispatch => ({
  createPlan : (newPlan) => dispatch(createPlan(newPlan))
})

export default connect(mapStateToProps, mapDispatchtoProps)(PlanConfirm);
