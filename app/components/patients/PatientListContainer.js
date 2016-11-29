// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deletePatient } from '../../reducers/patients'

//Material
import { GridList, GridTile, IconButton, Badge} from 'material-ui';
import {StepsRaisedButton} from '../material-style';
import moment from 'moment';


//-=-=-=-=-=-=-= GridList -=-=-=-=-=-=
 const gridList = {
  "width" : "fluid",
  height: "100%",
  overflow: 'visible',
  "textAlign" : "center"
}

 const gridTile = {
   "overflow" : "visible",
   "display" : "webikit-center"
 }




// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-



export class PatientList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showRemove : false
    }
    this.showRemove = this.showRemove.bind(this);
  }

  showRemove (){
    this.setState({showRemove:!this.state.showRemove});
  }

  render() {

    const { patients, removePatient } = this.props;

    return (
      <div id="patient-list" className="col-xs-12">
        <Helmet title="Patients" />
        <h1 className="page-header">Patient List</h1>
        <div className='row'>
        <div className="ptbutton">
          <div className="remove">
            <StepsRaisedButton fullWidth={true} id="cancel"
              label="Remove Patient"
              onClick={this.showRemove}
            />
          </div>
          <div className="add">
            <Link to="/patients/new">
              <StepsRaisedButton fullWidth={true}
                label="Add Patient"
              />
            </Link>
          </div>
        </div>
        </div>
        <div className="row" >

        <GridList
            cellHeight={'auto'}
            padding ={1}
            cols={'auto'}
            style={gridList}>

          {
            patients && patients.map( patient =>
              <GridTile key={ patient.id }
                   style={gridTile}>
               <Badge
                   className={ this.state.showRemove ? "showRemove" : "removeBadge"}
                   badgeContent={ <IconButton
                   tooltip="Remove Patient"
                   iconClassName="material-icons"
                   onClick={() => removePatient(patient.id)}>
                   highlight_off
                   </IconButton>}>

                <div className="tile" >
                  <div className="row" >
                    <div className="col-xs-6" >
                      <img className="img-responsive" src={patient.img_URL}/>
                      <h5> Patient Id : {patient.id} </h5>
                    </div>
                    <div className="col-xs-6" >
                      <h5>{`Last : ${patient.last_name} ` }</h5>
                      <h5>{`First : ${patient.first_name} ` }</h5>
                      <h5>{`DOB : ${moment(patient.DOB).format('l')} `}</h5>
                      <h5>{ `Gender : ${patient.gender}`}</h5>

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
                    </div>
                  </div>

                </div>
                </Badge>
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
