// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import { deletePatient } from '../../reducers/patients'

//Material
import { GridList, GridTile, IconButton, Badge, Dialog} from 'material-ui';
import {StepsRaisedButton, StepsFlatButton} from '../material-style';
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

    const { patients, removePatient } = this.props;
    const actions = [
        <StepsFlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.dialogClose}
        />,
        <StepsFlatButton
          label="Confirm"
          primary={true}
          keyboardFocused={true}
          onTouchTap={()=>{
            removePatient(this.state.selectedPt.id);
            this.dialogClose();
          }}
        />
      ];


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
            patients && patients.map( patient =>
              <GridTile key={ patient.id }
                   style={gridTile}>
               <Badge
                   className={ this.state.showRemove ? "showRemove" : "removeBadge"}
                   badgeContent={ <IconButton
                   tooltip="Remove Patient"
                   iconClassName="material-icons"
                   onClick={() => this.dialogOpen(patient)}>
                   highlight_off
                   </IconButton>}>

                <div className="tile" >
                  <div className="row" >
                    <div className="col-xs-6" >
                      <img className="img-responsive" src={patient.img_URL}/>
                      <p> Patient Id : {patient.emr_id} </p>
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
                      <IconButton tooltip="Current Plan" iconClassName="material-icons">
                      assignment
                      </IconButton>
                    </Link>
                    <Link to={`/patients/${patient.id}/plans/new`}>
                      <IconButton tooltip="Add Plan" iconClassName="material-icons">
                      add_box
                      </IconButton>
                    </Link>
                  </div>
                </div>
                </Badge>
              </GridTile>
            )
          }
        </GridList>
        </div>


            <Dialog
              title="Cofirm Deletion"
              actions={actions}
              modal={false}
              open={this.state.confirmOpen}
              onRequestClose={this.dialogClose}
            >
              {`Would you like to permenantly delete the following patient :
              ${this.state.selectedPt.first_name} ${this.state.selectedPt.last_name}`}
            </Dialog>

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
