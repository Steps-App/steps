// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

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

    const { plan, currentPatient } = this.props;

    return (
      <div id="patient-list" className="col-xs-12">
        <Helmet title="Plan Confirm" />
        <h1>Plan Confirmation</h1>
      
        <div id="treatmentsfinal" className="col-xs-8">
        <Table >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>Info</TableHeaderColumn>
              <TableHeaderColumn>Notes</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {
            plan.treatments && plan.treatments.map( treatment =>          
              <TableRow key={ treatment.id }>
                  <TableRowColumn>
                  <img style={{width: "auto", height: "auto"}} src={treatment.exercise.img_url} />
                  </TableRowColumn>
                  <TableRowColumn>
                    <p>{`${treatment.exercise.title}`}</p>
                    <p><span>Sets</span>{`: ${treatment.sets}`}</p>
                    <p><span>Reps</span>{`: ${treatment.reps}`}</p>
                    <p><span>Time</span>{`: ${treatment.time_per_exercise}`}</p>
                    <p><span>Resistance</span>{`: ${treatment.resistance}`}</p>
                  </TableRowColumn>
                  <TableRowColumn>
                    <p>{`${treatment.notes}`}</p>
                  </TableRowColumn>
              </TableRow>
            )
          }
         </TableBody>
        </Table>
      </div>
        <div className="sidepanel" >
          <div className="plan-details">
           <p><span>Patient Name</span>{`: ${currentPatient.first_name + " " + currentPatient.last_name  }`}</p>
            <p><span>Start</span>{`: ${plan.created_at}`}</p>
            <p><span>End</span>{`: ${plan.end_date}`}</p>
            <p><span>Injury</span>{`: ${plan.therapy_focus}`}</p>
          </div>
     
       <Link to="/patients">
          <RaisedButton
          label="Confrim"
          backgroundColor="#005B96"
          labelStyle={{color: 'white'}}
          />
        </Link>
      <Link to="/patients/:patientId/plans/new">
          <RaisedButton
          label="Edit"
          backgroundColor="#8D5300"
          labelStyle={{color: 'white'}}
          />
        </Link> 
        </div>   
      </div>
    )
  }
}








// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

// const mapStateToProps = ({ plan }) => ({ plan })

const mapStateToProps = ({ plan, currentPatient }) => (
  { 
     plan: {
      id: 1,
      created_at: '10/11/16',
      end_date: '12/2/16',
      therapy_focus: 'Torn Rotator Cuff',
      notes: "Normally, this would be done in a week ",
      treatments: [
        { id: 1, reps: 4, sets: 5, resistance: 'none', time_per_exercises: 150, status: 'active', plan_id: 1, exercise: { id: 1, title: 'Workout #1', img_url: 'http://www.knee-pain-explained.com/images/saq1.jpg',
          description: "no description"},
          notes: "these are notes" },
        { id: 2, reps: 4, sets: 5, resistance: 'none', time_per_exercises: 150, status: 'active', plan_id: 1, exercise: { id: 1, title: 'Workout #1', img_url: 'http://www.knee-pain-explained.com/images/saq1.jpg',
          description: "no description"},
          notes: "these are notes" },
        { id: 5, reps: 4, sets: 5, resistance: 'none', time_per_exercises: 150, status: 'active', plan_id: 1, exercise: { id: 1, title: 'Workout #1', img_url: 'http://www.knee-pain-explained.com/images/saq1.jpg',
          description: "no description"},
          notes: "these are notes" },
        ]
    },
    currentPatient: currentPatient
  }
)

const mapDispatchtoProps = dispatch => ({ 
  addPlan : (newPlan) => dispatch(createPlan(newPlan))
})

export default connect(mapStateToProps, mapDispatchtoProps)(PlanConfirm);

