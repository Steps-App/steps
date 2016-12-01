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

// redux and utils
import { fullName } from '../../utils';

// table style/labels
const colHeaderStyle = { color: textLight, textAlign: "center", fontWeight: "bold", fontSize: "14px" };
const tableCols = ['Therapy Focus', 'Start Date', 'End Date', 'Notes', ''];

const Plan = ({ currentPatient }) => {
  if (!Object.keys(currentPatient).length) return null;

  const patientName = fullName(currentPatient);
  const sortedPlans = currentPatient.plans.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  console.log(sortedPlans)
  const buttons = [
    <StepsRaisedButton
    label="Chat"
    fullWidth={true}
    onClick={() => console.log('route to chat')} />,
    <StepsRaisedButton
    label="Remove"
    fullWidth={true}
    backgroundColor={ errorText }
    onClick={() => console.log('pop up remove modal')} />
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
                  <TableRow selectable={false} style={{background: 'none'}}>
                    <TableRowColumn>{ plan.therapy_focus }</TableRowColumn>
                    <TableRowColumn>{ moment(plan.created_at).format('MMM Do, YYYY') }</TableRowColumn>
                    <TableRowColumn>{ moment(plan.end_date).format('MMM Do, YYYY') }</TableRowColumn>
                    <TableRowColumn className="minimize">{ plan.notes }</TableRowColumn>
                    <TableRowColumn>
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
    </div>
  )
};

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ currentPatient }) => ({ currentPatient })

export default connect(mapStateToProps)(Plan);
