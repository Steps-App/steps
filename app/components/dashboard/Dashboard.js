// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// sub-components
import StatCard from './StatCard'
import ProgressGraph from './ProgressGraph'
import { getCompletedWorkout, daysBetween } from '../../utils'

//Material UI
import {  } from 'material-ui'
import {  } from '../material-style'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

const Dashboard = ({ user, plan }) => {
  if (!Object.keys(plan).length) return null;
  // TODO: Complete dashboard for therapist -> for now, just return null
  if (user.role === 'therapist') return null;

  const workoutsToGo = plan.treatments.reduce((remaining, treatment) => {
    return getCompletedWorkout(treatment.workouts) ? remaining : remaining + 1;
  }, 0);
  const daysToGo = daysBetween(new Date(), new Date(plan.end_date));
  
  return (
    <div id="dashboard">
      <Helmet title="Dashboard" />
      <h1>{`Hello ${user.first_name}!`}</h1>
      <div className="cards row">
        <StatCard // Days left in plan 
          number={ daysToGo }
          iconPath="dashboard/calendar.svg"
          text="days left in your plan" />
        <StatCard // Workouts remaining for the day
          number={ workoutsToGo }
          iconPath="icons/exercises_dark.svg"
          text="more workouts to go" />
        {/* TODO: Calculate and display the actual percentage of workouts completed */}
        <StatCard // Total percentage of workouts completed
          number="7"
          units="%"
          iconPath="dashboard/pie-chart.svg"
          text="workouts completed" />
      </div>
      <ProgressGraph treatments={plan.treatments} />
    </div>
  )
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ user, plan }) => ({ user, plan })

export default connect(mapStateToProps)(Dashboard);
