// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deletePatient } from '../../reducers/patients'

//Material UI
import { Table, TableHeader, TableHeaderColumn,
         TableBody, TableRow, TableRowColumn, TableFooter, RaisedButton } from 'material-ui'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class PatientList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const { patients, removePatient } = this.props;

    return (
      <div id="patient-list" className="col-xs-12">
        <Helmet title="Patients" />
        <h1>Patient List</h1>
        <Link to="/patients/new">
          <RaisedButton
            label="Add Patient"
            backgroundColor="#005B96"
            labelStyle={{color: 'white'}}
          />
        </Link>
        <Table >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Gender</TableHeaderColumn>
              <TableHeaderColumn>{}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {
            patients && patients.map( patient =>
              <TableRow key={ patient.id }>
                  <TableRowColumn style={{ width: '250px', padding: 0 }}>
                    <img className="img-responsive" src={patient.img_URL}></img>
                  </TableRowColumn>
                  <TableRowColumn style={{ width: '150px' }}>
                    { patient.first_name + " " + patient.last_name }
                  </TableRowColumn>
                  <TableRowColumn style={{ width: '10px' }}>{ patient.gender }</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label="Current Plan"
                      backgroundColor="#005B96"
                      labelStyle={{color: 'white'}}
                      onClick={() => browserHistory.push(`/patients/${patient.id}/plans/current`)}
                    />
                    <RaisedButton
                      label="New Plan"
                      backgroundColor="#009900"
                      labelStyle={{color: 'white'}}
                      onClick={() => browserHistory.push(`/patients/${patient.id}/plans/new`)}
                    />
                    <RaisedButton
                      label="Delete Patient"
                      backgroundColor="#ff0000"
                      labelStyle={{color: 'white'}}
                      onClick={() => removePatient(patient.id)}
                    />
                  </TableRowColumn>
              </TableRow>
            )
          }
         </TableBody>
        </Table>
      </div>
    )
  }
}








// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ patients }) => ({ patients })

const mapDispatchToProps = (dispatch) => ({
  removePatient: (id) => dispatch(deletePatient(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
