import axios from 'axios';
import { browserHistory } from 'react-router';
import { isBrowser } from '../utils'

/* -----------------    ACTIONS     ------------------ */

export const RECEIVED_EXERCISES    = 'RECEIVED_EXERCISES'
export const REMOVE_EXERCISES      = 'REMOVE_EXERCISES'
export const REMOVE_ONE_EXERCISE   = 'REMOVE_ONE_EXERCISE'
export const ADD_EXERCISE          = 'ADD_EXERCISE'

/* ------------   ACTION CREATORS     ------------------ */

export const receivedExercises = exercises => ({ type: RECEIVED_EXERCISES, exercises })
export const removeExercises = () => ({ type: REMOVE_EXERCISES })
export const removeOneExercise = (id) => ({ type: REMOVE_ONE_EXERCISE, id })
export const addedExercise  = exercise => ({ type: ADD_EXERCISE, exercise })

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
    case ADD_EXERCISE:
      return [ ...currentExercises, action.exercise];
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


export const deleteExercise = (therapistId, id) => dispatch => {
  axios.delete(`/api/therapist/${therapistId}/exercises/${id}`)
    .then(ok => {
      dispatch(removeOneExercise(id))
      browserHistory.push('/exercises')
    })
    .catch(err => console.error(err))
}

export const addExercise = (therapistId, data, cb) => dispatch => {
  axios.post(`/api/therapist/${therapistId}/exercises`, {
    title: data.title,
    description: data.description,
    imgUrl: data.imgUrl,
    vidUrl: data.vidUrl
  })
    .then(res => {
      dispatch(addedExercise(res.data))
      cb();
    })
    .catch(err => {
      console.error('Unable to add exercise', err);
      cb('We experienced an unexpected error while trying to create your exercise. Please check your inputs.')
    });
}
