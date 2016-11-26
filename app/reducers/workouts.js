import axios from 'axios';

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

export const logActivity = (activity, done) => (dispatch) => {
  axios.post(`/api/patient/${activity.patientId}/plan/${activity.planId}/workout`, activity)
    .then(ok => done())
    .catch(err => {
      console.error('Unable to create workout', err)
      done('We experienced an unexpected error while trying to log your workout.')
    });
}
