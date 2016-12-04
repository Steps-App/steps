// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';

//Material UI
import { FontIcon, Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui';
import { StepsRaisedButton, StepsActionButton } from '../material-style';
import { toolbar, textLight, active, errorText } from '../colors';
import moment from 'moment';

// custom components
import ProgressGraph from '../dashboard/ProgressGraph'
import SidePanel from '../widgets/SidePanel';
import InfoItem from '../widgets/InfoItem';
import ConfirmDialog from '../widgets/ConfirmDialog';

// redux and utils
import { deletePatient } from '../../reducers/patients'
import { fullName } from '../../utils';

// table style
const colHeaderStyle = { color: textLight, textAlign: "center", fontWeight: "bold", fontSize: "14px" };

export class Patient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.dialogToggle = this.dialogToggle.bind(this);
  }

  dialogToggle(){
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    const { currentPatient } = this.props;
    if (!Object.keys(currentPatient).length) return null;

    const patientName = fullName(currentPatient);
    const sortedPlans = currentPatient.plans.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const buttons = [
      <StepsRaisedButton
      label="Chat"
      fullWidth={true}
      onTouchTap={ () => browserHistory.push(`/messages/${currentPatient.id}`) } />,
      <StepsRaisedButton
      label="Remove"
      fullWidth={true}
      backgroundColor={ errorText }
      onTouchTap={() => this.dialogToggle()} />
    ];

    return (
      <div id="single-patient">
        <Helmet title={ patientName } />
        <h1 className="page-header">{ patientName }</h1>
        <div className="single-patient-content">
          <div className="single-patient-data">
            <SidePanel imgURL={ currentPatient.img_URL } buttons={ buttons }>
              <InfoItem icon="fingerprint" label="Patient ID"
                content={ currentPatient.emr_id } />
              <InfoItem icon="event" label="Birthday"
                content={ currentPatient.DOB ? moment(currentPatient.DOB).format('MMM Do, YYYY') : 'N/A' } />
              <InfoItem icon="assignment_ind" label="Gender"
                content={ currentPatient.gender ? currentPatient.gender : 'N/A' } />
            </SidePanel>
            {
              // Pain progress graph of the current treatment
              sortedPlans && sortedPlans.length && sortedPlans[0].treatments ?
                <ProgressGraph
                  treatments={sortedPlans[0].treatments} /> : null
            }
          </div>
          {
            // Table of all of the patient's plans
            sortedPlans && sortedPlans.length ?
            <div className="plan-table">
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow
                  style={{ background: toolbar }}>
                    <TableHeaderColumn style={ colHeaderStyle }>Therapy Focus</TableHeaderColumn>
                    <TableHeaderColumn style={ colHeaderStyle }>Start Date</TableHeaderColumn>
                    <TableHeaderColumn style={ colHeaderStyle }>End Date</TableHeaderColumn>
                    <TableHeaderColumn className="minimize" style={ colHeaderStyle }>Notes</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                {
                  sortedPlans.map(plan => (
                    <TableRow key={plan.id} selectable={false} style={{background: 'none'}}>
                      <TableRowColumn style={{textAlign: "center"}}>{ plan.therapy_focus }</TableRowColumn>
                      <TableRowColumn style={{textAlign: "center"}}>{ moment(plan.created_at).format('MMM Do, YYYY') }</TableRowColumn>
                      <TableRowColumn style={{textAlign: "center"}}>{ moment(plan.end_date).format('MMM Do, YYYY') }</TableRowColumn>
                      <TableRowColumn style={{textAlign: "center"}} className="minimize">{ plan.notes }</TableRowColumn>
                      <TableRowColumn style={{textAlign: "center"}}>
                        <Link to={`/patients/${currentPatient.id}/plans/${plan.id}`}>
                          <FontIcon className="material-icons" hoverColor={ active }>assignment</FontIcon>
                        </Link>
                      </TableRowColumn>
                    </TableRow>
                  ))
                }
                </TableBody>
              </Table>
            </div> : null
          }
        </div>
        <ConfirmDialog
          title="Confirm Patient Deletion"
          isOpen={ this.state.isOpen }
          confirm={ () => {
            this.props.removePatient(currentPatient.id);
          }}
          dialogClose={ this.dialogToggle }>
          {`Would you like to permenantly delete the following patient: ${patientName}`}
        </ConfirmDialog>
      </div>
    );
  }
};

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ currentPatient }) => ({ currentPatient })

const mapDispatchToProps = (dispatch) => ({
  removePatient: id => dispatch(deletePatient(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
