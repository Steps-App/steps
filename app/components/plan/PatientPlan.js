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
          <p><span>Start</span>{`: ${plan.created_at.format('MMM Do, YY')}`}</p>
          <p><span>End</span>{`: ${plan.end_date}`}</p>
          <p><span>Injury</span>{`: ${plan.therapy_focus}`}</p>
        </div>
        <p><span>Notes</span>{`: ${plan.notes}`}</p>
      </div>
      <div className="workouts">
      {
        plan.treatments.map(treatment => {
          return treatment.status === 'active' ?
            <Workout key={treatment.id} num={++treatmentCount} treatment={treatment}/> : null
        })
      }
      </div>
    </div>
  )
}

// TODO: Update plan reducer to retrieve plan from the database
const mapStateToProps = ({ plan }) => ({ plan });
  // plan: {
  //   id: 1,
  //   created_at: moment(),
  //   end_date: moment().add(2, 'weeks'),
  //   therapy_focus: 'Torn Rotator Cuff',
  //   notes: "Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I\'m in a transitional period so I don\'t wanna kill you, I wanna help you. But I can\'t give you this case, it don\'t belong to me. Besides, I\'ve already been through too much shit this morning over this case to hand it over to your dumb ass.",
  //   treatments: [
  //     { id: 1, reps: 4, sets: 5, resistance: 'none', time_per_exercises: 150, status: 'active', plan_id: 1, exercise: { id: 1, title: 'Workout #1', img_url: 'http://www.knee-pain-explained.com/images/saq1.jpg',
  //       description: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?"},
  //       notes: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?" },
  //     { id: 2, reps: 6, sets: 12, resistance: 'none', time_per_exercises: 600, status: 'active', plan_id: 1, exercise: { id: 2, title: 'Workout #2', img_url: 'http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/knee_oa_exercises/webmd_photo_of_trainer_doing_calf_stretch.jpg',
  //       description: "Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass."},
  //       workouts: [
  //         { id: 2, plan_id: 1, treatment_id: 2, pain: 1, comments: 'feels so good', time_per_exercise: 120, created_at: moment().subtract(10, 'minutes') }
  //       ],
  //       notes: "Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass." },
  //     { id: 3, reps: 20, sets: 2, resistance: 'weighted', time_per_exercises: 120, status: 'active', plan_id: 1, exercise: { id: 3, title: 'Workout #3', img_url: 'http://www.prevention.com/sites/prevention.com/files/styles/article_main_image_2200px/public/comp-1946957-mitch-mandel.jpg?itok=CCJkIgYK',
  //       description: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb."},
  //       workouts: [
  //         { id: 1, plan_id: 1, treatment_id: 3, pain: 3, comments: 'wahhhhhh', time_per_exercise: 80, created_at: moment().subtract(5, 'minutes') }
  //       ],
  //       notes: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb." },
  //     { id: 4, reps: 5, sets: 5, resistance: 'none', time_per_exercises: 300, status: 'inactive', plan_id: 1, exercise: { id: 4, title: 'Workout #4', img_url: 'http://www.knee-pain-explained.com/images/saq1.jpg',
  //       description: "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing."},
  //       notes: "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing." },
  //     { id: 5, reps: 5, sets: 5, resistance: 'none', time_per_exercises: 300, status: 'active', plan_id: 1, exercise: { id: 4, title: 'Workout #4', img_url: 'http://www.knee-pain-explained.com/images/saq1.jpg',
  //       description: "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing."},
  //       notes: "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing." }
  //   ]
  // }

export default connect(mapStateToProps)(PatientPlan);
