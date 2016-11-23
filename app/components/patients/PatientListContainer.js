// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

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

    const { patients } = this.props;

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
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Gender</TableHeaderColumn>
              <TableHeaderColumn>{}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {
            patients && patients.map( patient =>          
              <TableRow key={ patient.id }>
                  <TableRowColumn style={{ padding: 0 }}>
                    <img style={{width: "auto", height: "auto"}} src={patient.img_URL}></img>
                  </TableRowColumn>
                  <TableRowColumn>
                    <Link to={`/patients/${patient.id}/plans/new`}>{ patient.first_name + " " + patient.last_name }</Link>
                  </TableRowColumn>
                  <TableRowColumn>{ patient.email }</TableRowColumn>
                  <TableRowColumn>{ patient.gender }</TableRowColumn>

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

const mapDispatchtoProps = dispatch => ({ 
  something: credentials => {
    console.log('Something:', credentials)
  },
  something2: (credentials, displayErr) => {
    console.log('Something2:', credentials)
  }
})

export default connect(mapStateToProps, mapDispatchtoProps)(PatientList);
