// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';

//Material UI
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui';
import { StepsRaisedButton } from '../material-style';
import { secondary } from '../colors';
import moment from 'moment';

// custom components
import TreatmentsList from '../treatment/TreatmentsList';
import SidePanel from '../widgets/SidePanel';
import InfoItem from '../widgets/InfoItem';

// redux and utils
import { createPlan } from '../../reducers/plan';
import { fullName } from '../../utils';

const Plan = ({ plan, currentPatient, createPlan, route }) => {
  const patientName = fullName(currentPatient);
  const buttons = route.confirm ? [
    <StepsRaisedButton
    label="Confirm"
    fullWidth={true}
    onClick={() => createPlan(plan)} />,
    <StepsRaisedButton
    label="Edit"
    fullWidth={true}
    backgroundColor={ secondary }
    onClick={() => browserHistory.push(`/patients/${currentPatient.id}/plans/new`)} />
  ] : null;
  return (
    <div id="confirm-plan">
      <Helmet title={route.confirm ? 'Confirm Plan' : `${patientName}'s Plan`} />
      <h1 className="page-header">{route.confirm ? 'Plan Confirmation' : `${patientName}'s Plan`}</h1>
      <div className="confirm-plan-content">
        <SidePanel imgURL={ currentPatient.img_URL } buttons={ buttons }>
          <InfoItem icon="person" label="Name"
            content={ patientName } />
          <InfoItem icon="fingerprint" label="Patient ID"
            content={ currentPatient.emr_id } />
          <InfoItem icon="event" label="Birthday"
            content={ currentPatient.DOB ? moment(currentPatient.DOB).format('MMM Do, YYYY') : 'N/A' } />
          <InfoItem icon="assignment_ind" label="Gender"
            content={ currentPatient.gender ? currentPatient.gender : 'N/A' } />
          <InfoItem icon="center_focus_strong" label="Therapy Focus"
            content={ plan.therapyFocus } />
          <InfoItem icon="timer" label="Duration"
            content={ plan.duration } />
          <InfoItem icon="speaker_notes" label="Notes"
            content={ plan.notes ? plan.notes : 'No notes specified' } />
        </SidePanel>
        {
          plan.treatments ? <TreatmentsList treatments={ plan.treatments } /> : null
        }
      </div>
    </div>
  )
};

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ plan, currentPatient }) => ({ plan, currentPatient })

const mapDispatchtoProps = dispatch => ({
  createPlan : (newPlan) => dispatch(createPlan(newPlan))
})

export default connect(mapStateToProps, mapDispatchtoProps)(Plan);
