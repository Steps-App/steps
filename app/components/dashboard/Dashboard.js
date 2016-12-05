// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// sub-components
import StatCard from './StatCard'
import ProgressGraph from './ProgressGraph'
import { getCompletedWorkout, daysBetween } from '../../utils'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

const Dashboard = ({ user, plan }) => {
  if (!Object.keys(plan).length) return null;
  // TODO: Complete dashboard for therapist -> for now, just return null
  if (user.role === 'therapist') return null;
  const workoutsToGo = plan.treatments.reduce((remaining, treatment) => {
    return getCompletedWorkout(treatment.workouts) ? remaining : remaining + 1;
  }, 0);
  const curDate = new Date();
  const daysToGo = daysBetween(curDate, new Date(plan.endDate));
  const daysSoFar = daysBetween(new Date(plan.createdAt), curDate);
  const completedWorkouts = plan.treatments.reduce((completed, treatment) => {
    return completed + treatment.workouts.length;
  }, 0);
  const percentCompleted = 100 * completedWorkouts / (daysSoFar * plan.treatments.length);
  
  return (
    <div id="dashboard">
      <Helmet title="Dashboard" />
      <h1 className="page-header">Dashboard</h1>
      <h2>{`Hello ${user.first_name}!`}</h2>
      <div className="cards">
        <StatCard // Days left in plan 
          number={ daysToGo }
          iconPath="dashboard/calendar.svg"
          text="days left in your plan" />
        <StatCard // Workouts remaining for the day
          className={ !workoutsToGo ? 'good' : workoutsToGo > plan.treatments.length / 2 ? 'bad' : '' }
          number={ workoutsToGo }
          iconPath="icons/exercises_dark.svg"
          text="more workouts to go" />
        <StatCard // Total percentage of workouts completed
          className={ percentCompleted > 80 ? 'good' : percentCompleted < 50 ? 'bad' : '' }
          number={ percentCompleted }
          units="%"
          iconPath="dashboard/pie-chart.svg"
          text="workouts completed" />
      </div>
      <div className="pain-graph">
        <ProgressGraph treatments={plan.treatments} />
      </div>
    </div>
  )
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ user, plan }) => ({ user, plan })

export default connect(mapStateToProps)(Dashboard);
