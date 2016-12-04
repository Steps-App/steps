// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deletePatient } from '../../reducers/patients'

//Material
import { GridList, GridTile, IconButton, Badge, FontIcon } from 'material-ui';
import { StepsRaisedButton, StepsActionButton } from '../material-style';
import SMS from 'material-ui/svg-icons/communication/textsms'
import { errorText } from '../colors';
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

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class PatientList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showRemove : false,
      notifications: [],
      confirmOpen: false,
      selectedPt: {}
    }
    this.showRemove = this.showRemove.bind(this);
    this.dialogClose = this.dialogClose.bind(this);
    this.dialogOpen = this.dialogOpen.bind(this);
    this.addNotification = this.addNotification.bind(this)
    this.removeNotification = this.removeNotification.bind(this)
  }

  componentDidMount() {
    this.socket = io.connect()
    this.socket.on('messageAlert', this.addNotification)
    this.socket.on('removeAlert', this.removeNotification)
  }


  showRemove (){
    this.setState({showRemove:!this.state.showRemove});
  }

  addNotification(id) {
    this.setState({ notifications: [...this.state.notifications, id] })
  }

  removeNotification(id) {
    this.setState({ notifications: this.state.notifications.filter(notification => {
      notification !== id
    }) })
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
              let hidden = this.state.notifications.includes(patient.id.toString()) ? '' : 'hidden'
              const patientButtons = [
                { icon: "person", tooltip: "Patient Details", link: `/patients/${patient.id}` },
                { icon: "assignment", tooltip: "Current Plan", link: `/patients/${patient.id}/plans/current` },
                { icon: "add_box", tooltip: "New Plan", link: `/patients/${patient.id}/plans/new` }
              ]
              return (
                <div className="tile-wrapper">
                  <StepsActionButton mini={ true }
                    className={ this.state.showRemove ? "show-remove" : "hide-remove"}
                    backgroundColor={ errorText }
                    onTouchTap={ () => this.dialogOpen(patient) } >
                    <FontIcon className={'material-icons'}>clear</FontIcon>
                  </StepsActionButton>
                  <GridTile key={ patient.id } className="grid-tile" style={{ overflow: 'visible' }}>
                  <div className={`message-notify ${hidden}`}>
                    <Link to={`messages/${patient.id}`}>
                      <SMS
                        tooltip="Patient Message Waiting"
                        color="green"
                        style={{ height: '48px', width: '48px'}}/>
                    </Link>
                  </div>
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
                  </GridTile>
                </div>
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

const mapStateToProps = ({ patients, notifications }) => ({ patients, notifications })

const mapDispatchToProps = (dispatch) => ({
  removePatient: (id) => dispatch(deletePatient(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
