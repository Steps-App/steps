import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const RECEIVED_EXERCISES    = 'RECEIVED_EXERCISES'

/* ------------   ACTION CREATORS     ------------------ */

export const receivedExercises = exercises => ({ type: RECEIVED_EXERCISES, exercises })

/* ------------       REDUCER     ------------------ */

const initialExercises = {}
export default function reducer(currentExercises = initialExercises, action) {
  switch (action.type) {
    case RECEIVED_EXERCISES:
      return action.exercises;
    default:
      return currentExercises;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchExercises = therapistId => dispatch => {
  axios.get(`/api/therapist/${therapistId}/exercises`)
    .then(res => dispatch(receivedExercises(res.data)))
    .catch(err => {
      console.error('Unable to retrieve exercises', err);
    });
};


