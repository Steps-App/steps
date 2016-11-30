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

const PlanConfirm = ({ plan, currentPatient, createPlan }) => (
  <div id="confirm-plan">
    <Helmet title="Confirm Plan" />
    <h1 className="page-header">Plan Confirmation</h1>
    <div className="confirm-plan-content">
      <SidePanel
        imgURL={ currentPatient.img_URL }
        buttons={[
          <StepsRaisedButton
          label="Confirm"
          fullWidth={true}
          onClick={() => createPlan(plan)} />,
          <StepsRaisedButton
          label="Edit"
          fullWidth={true}
          backgroundColor={ secondary }
          onClick={() => browserHistory.push(`/patients/${currentPatient.id}/plans/new`)} />
        ]}>
        <InfoItem icon="person" label="Name"
          content={ fullName(currentPatient) } />
        <InfoItem icon="date_range" label="Birthday"
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
      <TreatmentsList treatments={ plan.treatments } />
    </div>
  </div>
);

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ plan, currentPatient }) => ({ plan, currentPatient })

const mapDispatchtoProps = dispatch => ({
  createPlan : (newPlan) => dispatch(createPlan(newPlan))
})

export default connect(mapStateToProps, mapDispatchtoProps)(PlanConfirm);
