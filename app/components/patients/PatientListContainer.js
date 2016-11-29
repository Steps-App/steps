// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deletePatient } from '../../reducers/patients'

//Material
import { GridList, GridTile, IconButton} from 'material-ui';
import {StepsRaisedButton} from '../material-style';




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
        <h1 className="page-header">Patient List</h1>
        <div className="addptbutton">
            <Link to="/patients/new">
              <StepsRaisedButton
                label="Add Patient"
                backgroundColor="#005B96"
                labelStyle={{color: 'white'}}
              />
            </Link>
        </div>
        <div className="container" >

        <GridList
            cellHeight={200}>

          {
            patients && patients.map( patient =>
              <GridTile key={ patient.id }>
                  <div className="row" >
                    <div className="col-xs-12 col-md-6" >
                      <img className="img-responsive" src={patient.img_URL}/>
                    </div>
                    <div className="col-xs-12 col-md-6" >
                      <h5>{ patient.first_name + " " + patient.last_name }</h5>
                      <h5>{ `Gender : ${patient.gender}`}</h5>
                    </div>
                  </div>
                  <div className="row">
                    <Link to={`/patients/${patient.id}/plans/current`}>
                      <IconButton tooltip="Current Plan" iconClassName="material-icons">
                      assignment
                      </IconButton>
                    </Link>
                    <Link to={`/patients/${patient.id}/plans/new`}>
                      <IconButton tooltip="Current Plan" iconClassName="material-icons">
                      add_box
                      </IconButton>
                    </Link>

                      <IconButton
                      tooltip="Current Plan"
                      iconClassName="material-icons"
                      onClick={() => removePatient(patient.id)}>
                      highlight_off
                      </IconButton>


                  </div>
              </GridTile>
            )
          }
        </GridList>
        </div>
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
