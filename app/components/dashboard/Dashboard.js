// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// sub-components
import StatCard from './StatCard';
import ProgressGraph from './ProgressGraph';
import PieChart from './PieChart';

// helper utils
import { getCompletedWorkout, daysBetween } from '../../utils';
import { THERAPIST, PATIENT } from '../../constants';


// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

const Dashboard = ({ user, plan, patients }) => {

  // Patient calculations
  let workoutsToGo, daysToGo, percentCompleted, genders;
  if (user.role === PATIENT) {
    if (!Object.keys(plan).length) return null;
    workoutsToGo = plan.treatments.reduce((remaining, treatment) => {
      return getCompletedWorkout(treatment.workouts) ? remaining : remaining + 1;
    }, 0);
    const curDate = new Date();
    daysToGo = daysBetween(curDate, new Date(plan.endDate));
    const daysSoFar = daysBetween(new Date(plan.createdAt), curDate);
    const completedWorkouts = plan.treatments.reduce((completed, treatment) => {
      return completed + treatment.workouts.length;
    }, 0);
    percentCompleted = Math.round(100 * completedWorkouts / (daysSoFar * plan.treatments.length));
  }
  else if (user.role === THERAPIST) {
    if (!patients.length) return null;
    genders = patients.reduce((genderHash, patient) => {
      if (!patient.gender)
        patient.gender = 'Other';
      genderHash[patient.gender] =
        !genderHash[patient.gender] ? 1 : genderHash[patient.gender] + 1;
      return genderHash;
    }, {});
  }

  return (
    <div id="dashboard">
      <Helmet title="Dashboard" />
      <h1 className="page-header">Dashboard</h1>
      <h2>{`Hello ${user.first_name}!`}</h2>
      {
        // Show role-specific stat cards
        user.role === PATIENT ?
        <div className="cards">
          <StatCard // Days left in plan 
            number={ daysToGo }
            icon="date_range"
            text="days left in your plan" />
          <StatCard // Workouts remaining for the day
            className={ !workoutsToGo ? 'good' : workoutsToGo > plan.treatments.length / 2 ? 'bad' : '' }
            number={ workoutsToGo }
            icon="fitness_center"
            text="more workouts to go" />
          <StatCard // Total percentage of workouts completed
            className={ percentCompleted > 80 ? 'good' : percentCompleted < 50 ? 'bad' : '' }
            number={ percentCompleted }
            units="%"
            icon="data_usage"
            text="workouts completed" />
        </div> :
        <div className="cards">
          <StatCard // Total number of patients
            number={ patients.length }
            icon="people_outline"
            text="total patients" />
        </div>
      }
      {
        // Show role-specific charts
        user.role === PATIENT ?
          <div className="pain-graph">
            <ProgressGraph treatments={plan.treatments} />
          </div> :
          <div className="therapist-graphs">
            <PieChart data={ genders } title="Gender"/>
          </div>
      }
    </div>
  )
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ user, plan, patients }) => ({ user, plan, patients })

export default connect(mapStateToProps)(Dashboard);
