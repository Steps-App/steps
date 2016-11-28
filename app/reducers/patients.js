import axios from 'axios';
import { browserHistory } from 'react-router';
import { isBrowser } from '../utils'
import { removePlan } from './plan'

/* -----------------    ACTIONS     ------------------ */

export const RECEIVED_PATIENTS    = 'RECEIVED_PATIENTS'
export const ADDED_PATIENT        = 'ADDED_PATIENT'
export const REMOVE_ONE_PATIENT   = 'REMOVE_ONE_PATIENT'
export const REMOVE_PATIENTS      = 'REMOVE_PATIENTS'

/* ------------   ACTION CREATORS     ------------------ */

export const receivedPatients = patients => ({ type: RECEIVED_PATIENTS, patients })
export const addedPatient  = patient => ({ type: ADDED_PATIENT, patient })
export const removeOnePatient = (id) => ({ type: REMOVE_ONE_PATIENT, id })
export const removePatients  = () => ({ type: REMOVE_PATIENTS })

/* ------------       REDUCER     ------------------ */

const initialPatients = []
export default function reducer(currentPatients = initialPatients, action) {
  switch (action.type) {
    case RECEIVED_PATIENTS:
      return action.patients;
    case ADDED_PATIENT:
      return [ ...currentPatients, action.patient];
    case REMOVE_ONE_PATIENT:
      return currentPatients.filter(patient => patient.id !== action.id)
    case REMOVE_PATIENTS:
      return initialPatients;
    default:
      return currentPatients;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchPatients = therapistId => dispatch => {
  axios.get(`/api/therapist/${therapistId}/patients`)
    .then(res => {
      dispatch(receivedPatients(res.data))
      dispatch(removePlan())
    })
    .catch(err => console.error('Unable to retrieve patients', err));
}

export const createPatient = (data, displayErr) => dispatch => {
  axios.post(`/api/therapist/${data.therapistId}/patients`, {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email
  })
    .then(res => {
      dispatch(addedPatient(res.data))
      if (isBrowser())
        browserHistory.push('/patients');
    })
    .catch(err => {
      console.error('Unable to add patient', err)
      displayErr('We experienced an unexpected error while trying to add your patient. Please try again later.')
    });
}

export const deletePatient = (id) => dispatch => {
  axios.delete(`/api/patient/${id}`)
    .then(ok => {
      dispatch(removeOnePatient(id))
      browserHistory.push('/patients')
    })
    .catch(err => console.error(err))
}
