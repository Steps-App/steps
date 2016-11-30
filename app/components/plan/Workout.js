import React from 'react';
import { Link } from 'react-router'

// style imports
import { StepsActionButton } from '../material-style'
import FontIcon from 'material-ui/FontIcon'
import InfoItem from '../widgets/InfoItem'
import { textLight } from '../colors'

// other libs
import { getCompletedWorkout, formatTime } from '../../utils'
import moment from 'moment';

export default ({ treatment, workoutFn, num }) => {
  const completedWorkout = getCompletedWorkout(treatment.workouts);

  return (
    <div className={`workout ${completedWorkout ? 'completed' : ''}`}>
      <div className="workout-notes">
        {
          // Show either treatment notes or workout comments (if completed)
          !completedWorkout ?
            <div>
              <InfoItem icon="description" label="Description" iconColor={ textLight }
                content={ treatment.exercise.description } />
              <InfoItem icon="speaker_notes" label="Notes" iconColor={ textLight }
                content={ treatment.notes ? treatment.notes : 'No notes specified' } />
            </div>
            : completedWorkout.comments ?
            <InfoItem icon="speaker_notes" label="Comments" iconColor={ textLight }
              content={ completedWorkout.comments } /> : null
        }
      </div>
      <div className="workout-banner">
        <div className="workout-info">
          <h2>
            <Link to={`/plan/treatments/${treatment.id}`}>
              {treatment.exercise.title}
            </Link>
          </h2>
          <div>
            <InfoItem icon="all_inclusive" label="Sets" iconColor={ textLight }
              content={ treatment.sets } />
            <InfoItem icon="layers" label="Reps" iconColor={ textLight }
              content={ treatment.reps } />
          </div>
          <div className="bonus-info">
            <InfoItem icon="alarm" label="Time" iconColor={ textLight }
              content={ formatTime(treatment.time_per_exercise) } />
            <InfoItem icon="fitness_center" label="Resistance" iconColor={ textLight }
              content={ treatment.resistance } />
          </div>
        </div>
        <div className="workout-button">
        {
          completedWorkout ?
            <StepsActionButton disabled={true}>
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
      <div className="treatment-number">#{num}</div>
      <div className="workout-pic-wrapper">
        <img
          className="workout-pic"
          alt={treatment.exercise.title}
          src={treatment.exercise.img_url} />
      </div>
    </div>
  )
}
