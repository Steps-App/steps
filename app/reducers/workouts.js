import axios from 'axios';
import { browserHistory } from 'react-router';
import { isBrowser } from '../utils'

/* -----------------    ACTIONS     ------------------ */



/* ------------   ACTION CREATORS     ------------------ */



/* ------------       REDUCER     ------------------ */

export default function workoutReducer(workout = null, action) {
  switch (action.type) {
    default:
      return workout
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const logActivity = (activity) => (dispatch) => {
  axios.post(`/api/patient/${activity.patientId}/plan/${activity.planId}/workout`, activity)
    .then(ok => console.log('Workout logged'))
    .catch(err => console.error('Unable to create workout', err))
}
