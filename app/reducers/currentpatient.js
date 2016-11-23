import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const CURRENT_PATIENT    = 'CURRENT_PATIENTS'


/* ------------   ACTION CREATORS     ------------------ */

export const currentPatient  = patient => ({ type: CURRENT_PATIENT, patient })

/* ------------       REDUCER     ------------------ */

const initialPatient = {}
export default function reducer(currentPatient = initialPatient, action) {
  switch (action.type) {
    case CURRENT_PATIENT:
      return action.patient;
    default:
      return currentPatient;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchCurrentPatient = patientId => dispatch => {
  axios.get(`/api/patient/${patientId}`)
    .then(res => dispatch(currentPatient(res.data)))
    .catch(err => console.error('Unable to retrieve patient', err));
}


