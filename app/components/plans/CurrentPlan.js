// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';

//Material UI
import { Table, TableHeader, TableHeaderColumn,
         TableBody, TableRow, TableRowColumn, TableFooter, RaisedButton } from 'material-ui'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class CurrentPlan extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const { plan, currentPatient, exercises } = this.props;

    return (
      <div id="patient-list" className="col-xs-12">
        <Helmet title="Current Patient Plan" />
        <h1>Current Patient Plan</h1>

        <div id="treatmentsfinal" className="col-xs-10">
        <Table style={{backgroundColor:'none'}}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
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
      </div>
    </div>
    )
  }
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ plan, currentPatient, exercises }) => ({ plan, currentPatient, exercises })

export default connect(mapStateToProps)(CurrentPlan);
