// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deletePatient } from '../../reducers/patients'

//Material
import { GridList, GridTile, IconButton, Badge } from 'material-ui';
import { StepsRaisedButton } from '../material-style';
import moment from 'moment';

// Custom components
import InfoItem from '../widgets/InfoItem';
import ConfirmDialog from '../widgets/ConfirmDialog';
import { fullName } from '../../utils';

//-=-=-=-=-=-=-= GridList -=-=-=-=-=-=
const gridList = {
  width : 'fluid',
  height: '100%',
  overflow: 'visible',
  justifyContent : 'center'
}

const gridTile = {
  overflow : 'visible',
  display : 'webikit-center'
}

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class PatientList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showRemove : false,
      confirmOpen:false,
      selectedPt :{}
    }
    this.showRemove = this.showRemove.bind(this);
    this.dialogClose = this.dialogClose.bind(this);
    this.dialogOpen = this.dialogOpen.bind(this);
  }

  showRemove (){
    this.setState({showRemove:!this.state.showRemove});
  }

  dialogClose(){
    this.setState({confirmOpen: false});
    this.setState({selectedPt :{}});
  }

  dialogOpen(patient){
    this.setState({confirmOpen: true});
    this.setState({selectedPt : patient});
  }

  render() {
    const { patients } = this.props;
    return (
      <div id="patient-list" className="col-xs-12">
        <Helmet title="Patients" />
        <h1 className="page-header">Patient List</h1>
        <div className='row'>
        <div className="ptbutton">
          <div className="add">
            <Link to="/patients/new">
              <StepsRaisedButton fullWidth={true}
                label="Add Patient"
              />
            </Link>
          </div>
          <div className={this.state.showRemove ? "finish" : "remove"}>
            <StepsRaisedButton fullWidth={true} id="cancel"
              label={this.state.showRemove ? "Edit Finished" : "Edit Patients"}
              onClick={this.showRemove}
            />
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
            // Sort patients alphabetically and map them into GridTile components
            patients && patients.sort((a,b) => {
              if (b.last_name < a.last_name) return 1;
              else if (b.last_name > a.last_name) return -1;
              else return 0;
            }).map( patient => {
              const patientButtons = [
                { icon: "person", tooltip: "Patient Details", link: `/patients/${patient.id}` },
                { icon: "assignment", tooltip: "Current Plan", link: `/patients/${patient.id}/plans/current` },
                { icon: "add_box", tooltip: "New Plan", link: `/patients/${patient.id}/plans/new` }
              ]
              return (
                <GridTile key={ patient.id }
                    style={gridTile}>
                  <Badge
                      className={ this.state.showRemove ? "showRemove" : "removeBadge"}
                      badgeContent={ <IconButton
                      tooltip="Remove Patient"
                      iconClassName="material-icons"
                      onClick={() => this.dialogOpen(patient)}>highlight_off</IconButton>}>
                    <div className="tile" >
                      <div className="patient-info" >
                        <div className="patient-img"><img src={ patient.img_URL } /></div>
                        <div className='patient-buttons'>
                        {
                          patientButtons.map(btn =>
                            <Link key={`${patient.id}_${btn.tooltip}`} to={ btn.link }>
                              <IconButton tooltip={ btn.tooltip }
                                iconClassName="material-icons"
                                tooltipPosition="top-right"
                                tooltipStyles={{left: "40px", top: "22px"}}>
                                { btn.icon }
                              </IconButton>
                            </Link>
                          )
                        }
                        </div>
                      </div>
                      <div className="patient-data">
                        <InfoItem icon="person" label="Name"
                          content={ fullName(patient, true) } />
                        <InfoItem icon="fingerprint" label="Patient ID"
                          content={ patient.emr_id } />
                        <InfoItem icon="event" label="DOB"
                          content={ patient.DOB ? moment(patient.DOB).format('MMM Do, YYYY') : 'N/A' } />
                        <InfoItem icon="assignment_ind" label="Gender"
                          content={ patient.gender ? patient.gender : 'N/A' } />
                      </div>
                    </div>
                    </Badge>
                </GridTile>
              )
            }
            )
          }
        </GridList>
        </div>
        <ConfirmDialog
          title="Confirm Patient Deletion"
          isOpen={ this.state.confirmOpen }
          confirm={ () => this.props.removePatient(this.state.selectedPt.id) }
          dialogClose={ this.dialogClose }>
          {`Would you like to permenantly delete the following patient:
          ${this.state.selectedPt.first_name} ${this.state.selectedPt.last_name}`}
        </ConfirmDialog>
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
