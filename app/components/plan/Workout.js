import React from 'react';
import { StepsActionButton } from '../material-style'
import FontIcon from 'material-ui/FontIcon'
import { formatTime } from '../../utils'
import moment from 'moment';

export default ({ treatment }) => {
  const completedWorkout = treatment.workouts && treatment.workouts.find(workout => {
    return moment(workout.created_at).format('MM/DD/YYYY') ===
      moment().format('MM/DD/YYYY');
  })
  console.log(completedWorkout);
  return (
    <div className="col-xs-12 workout">
      <img src={treatment.exercise.img_url} />
      <div className="workout-info">
        <h2>{treatment.exercise.title}</h2>
        <div className="workout-nums">
          <p><span>Sets</span>{`: ${treatment.sets}`}</p>
          <p><span>Reps</span>{`: ${treatment.reps}`}</p>
        </div>
        <p><span>Time</span>{`: ${formatTime(treatment.time_per_exercises)}`}</p>
        <p><span>Resistance</span>{`: ${treatment.resistance}`}</p>
      </div>
      <p><span>Notes</span>{`: ${treatment.notes}`}</p>
      <StepsActionButton disabled={ completedWorkout ? true : false }>
        <FontIcon className={'material-icons'}>schedule</FontIcon>
      </StepsActionButton>
    </div>
  )
}