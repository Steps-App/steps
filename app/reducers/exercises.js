import axios from 'axios';
import { browserHistory } from 'react-router';

/* -----------------    ACTIONS     ------------------ */

export const RECEIVED_EXERCISES    = 'RECEIVED_EXERCISES'
export const REMOVE_EXERCISES      = 'REMOVE_EXERCISES'
export const REMOVE_ONE_EXERCISE   = 'REMOVE_ONE_EXERCISE'

/* ------------   ACTION CREATORS     ------------------ */

export const receivedExercises = exercises => ({ type: RECEIVED_EXERCISES, exercises })
export const removeExercises = () => ({ type: REMOVE_EXERCISES })
export const removeOneExercise = (id) => ({ type: REMOVE_ONE_EXERCISE, id })

/* ------------       REDUCER     ------------------ */

const initialExercises = [];
export default function reducer(currentExercises = initialExercises, action) {
  switch (action.type) {
    case RECEIVED_EXERCISES:
      return action.exercises;
    case REMOVE_EXERCISES:
      return initialExercises;
    case REMOVE_ONE_EXERCISE:
      return currentExercises.filter(exercise => exercise.id !== action.id)
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

//this delete route does not exist 

export const deleteExercise = (therapistId, id) => dispatch => {
  axios.delete(`/api/therapist/${therapistId}/exercises/${id}`)
    .then(ok => {
      dispatch(removeOneExercise(id))
      browserHistory.push('/exercises')
    })
    .catch(err => console.error(err))
}
