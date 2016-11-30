import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import { Paper } from 'material-ui';
import Workout from './Workout'
import InfoItem from '../widgets/InfoItem'
import { background, primary, active, errorText } from '../colors'
import { createdPlan } from '../../reducers/plan'

const PatientPlan =  ({ plan }) => {
  if (!Object.keys(plan).length) return null;
  let treatmentCount = 0;

  return (
    <div id="plan">
      <Helmet title="My Plan" />
      <h1 className="page-header">My Plan</h1>
      <div className="plan-content">
        <div className="plan-info">
          <Paper style={{ backgroundColor: background }} zDepth={2} rounded={false}>
            <div className="plan-details">
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
            </div>
          </Paper>
        </div>
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
