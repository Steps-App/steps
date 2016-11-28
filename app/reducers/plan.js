import axios from 'axios';
import { browserHistory } from 'react-router';


/* -----------------    ACTIONS     ------------------ */

export const ADD_PLAN = 'ADD_PLAN';
export const REMOVE_PLAN = 'REMOVE_PLAN'
export const RECEIVE_PLAN = 'RECEIVE_PLAN';

/* ------------   ACTION CREATORS     ------------------ */

//export const receivePlan = plan => ({ type: RECEIVE_PLAN, plan })
export const addPlan  = plan => ({ type: ADD_PLAN, plan });
export const removePlan = () => ({ type: REMOVE_PLAN })
export const receivePlan  = plan => ({ type: RECEIVE_PLAN, plan });

/* ------------       REDUCER     ------------------ */

export default function reducer(currentPlan = null, action) {
  switch (action.type) {
    case ADD_PLAN:
      return action.plan;
    case RECEIVE_PLAN:
      return action.plan;
    case REMOVE_PLAN:
      return null
    default:
      return null;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const createPlan = (data, displayErr) => dispatch => {
  axios.post(`/api/patient/${data.patient_id}/plan`, {
      plan:{duration: data.duration, therapyFocus: data.therapyFocus, notes: data.notes},
      treatments: data.treatments
    })
    .then(ok => browserHistory.push('/patients'))
    .catch(err => {
      console.error('Unable to add plan', err);
      displayErr('We experienced an unexpected error while trying to add your plan. Please try again later.');
    });
};

export const fetchPatientPlan = patientId => dispatch => {
  axios.get(`/api/patient/${patientId}/plan/current`)
    .then(res => {
      if (res.data)
        dispatch(receivePlan(res.data));
    })
    .catch(err => console.error('Unable to fetch plan', err));
};
