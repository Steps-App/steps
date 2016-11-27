import axios from 'axios';
import { browserHistory } from 'react-router';
import { isBrowser } from '../utils'

/* -----------------    ACTIONS     ------------------ */

export const RECEIVED_PATIENTS    = 'RECEIVED_PATIENTS'
export const ADDED_PATIENT        = 'ADDED_PATIENT'
export const REMOVE_PATIENTS      = 'REMOVE_PATIENTS'

/* ------------   ACTION CREATORS     ------------------ */

export const receivedPatients = patients => ({ type: RECEIVED_PATIENTS, patients })
export const addedPatient  = patient => ({ type: ADDED_PATIENT, patient })
export const removePatients  = () => ({ type: REMOVE_PATIENTS })

/* ------------       REDUCER     ------------------ */

const initialPatients = []
export default function reducer(currentPatients = initialPatients, action) {
  switch (action.type) {
    case RECEIVED_PATIENTS:
      return action.patients;
    case ADDED_PATIENT:
      return [ ...currentPatients, action.patient];
    case REMOVE_PATIENTS:
      return initialPatients;
    default:
      return currentPatients;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchPatients = therapistId => dispatch => {
  axios.get(`/api/therapist/${therapistId}/patients`)
    .then(res => dispatch(receivedPatients(res.data)))
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
