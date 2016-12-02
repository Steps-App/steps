// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deletePatient } from '../../reducers/patients'

//Material
import { GridList, GridTile, Badge, IconButton} from 'material-ui';
import { StepsRaisedButton, StepsIconButton } from '../material-style';
import moment from 'moment';

//-=-=-=-=-=-=-= GridList -=-=-=-=-=-=

 const gridList = {
  "width" : "fluid",
  height: "100%",
  overflow: 'visible',
  "justify-content" : "center"
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
      showRemove : false,
      notifications: []
    }
    this.showRemove = this.showRemove.bind(this);
    this.addNotification = this.addNotification.bind(this)
    this.removeNotification = this.removeNotification.bind(this)
  }

  componentDidMount() {
    this.socket = io()
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
              label={this.state.showRemove ? "Done Removing" : "Remove Patient"}
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
            patients && patients.map(patient => {
              let hidden = this.state.notifications.includes(patient.id) ? '' : 'hidden'

              return (
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
                        <p> Patient Id : {patient.id} </p>
                      </div>
                      <div className="col-xs-6" >
                        <p>{`Last : ${patient.last_name} ` }</p>
                        <p>{`First : ${patient.first_name} ` }</p>
                        <p>{`DOB : ${patient.DOB ? moment(patient.DOB).format('l') : 'None'} `}</p>
                        <p>{ `Gender : ${patient.gender ? patient.gender : 'n/a'}`}</p>

                      </div>
                    </div>
                    <div className='row' id='pticon'>

                      <Link to={`/patients/${patient.id}/plans/current`}>
                        <StepsIconButton tooltip="Current Plan" iconClassName="material-icons">
                        assignment
                        </StepsIconButton>
                      </Link>
                      <Link to={`/patients/${patient.id}/plans/new`}>
                        <StepsIconButton tooltip="Add Plan" iconClassName="material-icons">
                        add_box
                        </StepsIconButton>
                      </Link>
                      <Link to={`/messages/${patient.id}`}>
                        <StepsIconButton
                          tooltip="Message Patient"
                          iconClassName="material-icons">
                        message
                        </StepsIconButton>
                      </Link>
                    </div>
                  </div>
                  <div className={`message-notify ${hidden}`}>
                    <StepsIconButton
                      tooltip="Patient Message Waiting"
                      iconClassName="material-icons">
                    message
                    </StepsIconButton>
                  </div>
                  </Badge>
                </GridTile>
              )
            })}
          </GridList>
          </div>
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
