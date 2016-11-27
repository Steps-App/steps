import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import Workout from './Workout'
import { createdPlan } from '../../reducers/plan'

const PatientPlan =  ({ plan }) => {
  if (!Object.keys(plan).length) return null;
  let treatmentCount = 0;

  return (
    <div id="plan">
      <Helmet title="My Plan" />
      <h1>My Plan</h1>
      <div className="plan-info">
        <div className="plan-details">
          <p><span>Start</span>{`: ${moment(plan.created_at).format('MMM Do, YYYY')}`}</p>
          <p><span>End</span>{`: ${moment(plan.end_date).format('MMM Do, YYYY')}`}</p>
          <p><span>Injury</span>{`: ${plan.therapy_focus}`}</p>
        </div>
        {
          plan.notes ? <p><span>Notes</span>{`: ${plan.notes}`}</p> : null
        }
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
  )
}

const mapStateToProps = ({ plan }) => ({ plan });

export default connect(mapStateToProps)(PatientPlan);
