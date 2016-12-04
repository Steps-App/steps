import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const CURRENT_PATIENT = 'CURRENT_PATIENTS';
export const REMOVE_PATIENT = 'REMOVE_PATIENTS';


/* ------------   ACTION CREATORS     ------------------ */

export const currentPatient  = patient => ({ type: CURRENT_PATIENT, patient });
export const removePatient  = () => ({ type: REMOVE_PATIENT });

/* ------------       REDUCER     ------------------ */

const initialPatient = {};
export default function reducer(currentPatient = initialPatient, action){
  switch (action.type) {
    case CURRENT_PATIENT:
      return action.patient;
    case REMOVE_PATIENT:
      return initialPatient;
    default:
      return currentPatient;
  }
}

/* ------------       DISPATCHERS     ------------------ */

// If allData == true, retrievs treatments and workouts as well
export const fetchCurrentPatient = (patientId, allData) => dispatch => {
  axios.get(`/api/patient/${patientId}${allData ? '?treatments=yes&workouts=yes' : ''}`)
    .then(res => dispatch(currentPatient(res.data)))
    .catch(err => console.error('Unable to retrieve patient', err));
};
