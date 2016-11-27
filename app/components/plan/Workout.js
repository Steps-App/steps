import React from 'react';
import { Link } from 'react-router'
import { SvgIcon } from 'material-ui';
import { StepsActionButton } from '../material-style'
import FontIcon from 'material-ui/FontIcon'
import { formatTime } from '../../utils'
import moment from 'moment';

export default ({ treatment, workoutFn, num }) => {
  const completedWorkout = treatment.workouts && treatment.workouts.find(workout => {
    return moment(workout.created_at).format('MM/DD/YYYY') ===
      moment().format('MM/DD/YYYY');
  })

  return (
    <div className={`row workout ${completedWorkout ? 'completed' : ''}`}>
      <div className="workout-index">#{num}</div>
      <img className="col-xs-3 workout-pic" src={treatment.exercise.img_url} />
      <div className="col-xs-3 workout-info">
        <Link to={`/plan/treatments/${treatment.id}`}>
          <h2>{treatment.exercise.title}</h2>
        </Link>
        <div className="workout-nums">
          <p><span>Sets</span>{`: ${treatment.sets}`}</p>
          <p><span>Reps</span>{`: ${treatment.reps}`}</p>
        </div>
        <p><span>Time</span>{`: ${formatTime(treatment.time_per_exercise)}`}</p>
        <p><span>Resistance</span>{`: ${treatment.resistance}`}</p>
      </div>
      <p className="col-xs-4">
        <span>Notes</span>
        {`: ${treatment.notes ? treatment.notes : 'No notes specified'}`}
      </p>
      <div className="col-xs-2 workout-button">
      {
        completedWorkout ?
          <StepsActionButton disabled={true}>
            {/* TODO: Currently defaulting to pain level 3 when no input -> need real default */}
            {
              completedWorkout.pain ?
                <img src={require(`../../../src/images/emojis/${completedWorkout.pain}pain.svg`)} /> :
                <FontIcon className={'material-icons'}>check</FontIcon>
            }
          </StepsActionButton> :
          <Link to={`/plan/treatments/${treatment.id}/workout`}>
            <StepsActionButton>
              <FontIcon className={'material-icons'}>schedule</FontIcon>
            </StepsActionButton>
          </Link>
      }
      </div>
    </div>
  )
}
