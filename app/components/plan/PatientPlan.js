import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import moment from 'moment';
import Workout from './Workout'
import SidePanel from '../widgets/SidePanel'
import InfoItem from '../widgets/InfoItem'
import { primary, active, errorText } from '../colors'

const PatientPlan =  ({ plan }) => {
  if (!Object.keys(plan).length) {
    return (
      <div>
        <h1 className="page-header"><p>No Plan Currently Active</p></h1>
        <h4><p><Link to="/messages">Message</Link> your therapist to check the status of your plan.</p></h4>
      </div>
    )
  }

  let treatmentCount = 0;

  return (
    <div id="plan">
      <Helmet title="My Plan" />
      <h1 className="page-header">My Plan</h1>
      <div className="plan-content">
        <SidePanel>
          <InfoItem icon="date_range" iconColor={primary}
            label="Start" content={ moment(plan.createdAt).format('MMM Do, YYYY') } />
          <InfoItem icon="date_range" iconColor={active}
            label="Current" content={ moment().format('MMM Do, YYYY') } />
          <InfoItem icon="date_range" iconColor={errorText}
            label="End" content={ moment(plan.endDate).format('MMM Do, YYYY') } />
          <InfoItem icon="accessibility" label="Therapy Focus"
            content={ plan.therapyFocus } />
          {
            plan.notes ?
              <InfoItem icon="speaker_notes" label="Notes"
                content={ plan.notes } /> : null
          }
        </SidePanel>
        <div className="workouts">
        {
          plan.treatments && plan.treatments.map(treatment => {
            return treatment.status === 'active' ?
              <Workout key={treatment.id} num={++treatmentCount} treatment={treatment} /> : null
          })
        }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ plan }) => ({ plan });

export default connect(mapStateToProps)(PatientPlan);
