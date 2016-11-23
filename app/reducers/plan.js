import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const RECEIVE_PLAN = 'RECEIVE_PLAN';
export const CREATE_PLAN = 'CREATE_PLAN';

/* ------------   ACTION CREATORS     ------------------ */

//export const receivePlan = plan => ({ type: RECEIVE_PLAN, plan })
export const createPlan  = plan => ({ type: CREATE_PLAN, plan });
export const receivePlan  = plan => ({ type: RECEIVE_PLAN, plan });

/* ------------       REDUCER     ------------------ */

const initialPlan = {}
export default function reducer(currentPlan = initialPlan, action) {
  switch (action.type) {
    case CREATE_PLAN:
    case RECEIVE_PLAN:
      return action.plan;
    default:
      return currentPlan;
  }
}

/* ------------       DISPATCHERS     ------------------ */


export const createdPlan = (data, displayErr) => dispatch => {
  axios.post(`/api/patient/${data.patient_id}/plan`, {
    plan:{duration: data.duration, therapy_focus: data.therapy_focus, notes: data.notes},
    treatments: data.treatments
  })
    .then(res => {
      dispatch(createPlan(res.data))
    })
    .catch(err => {
      console.error('Unable to add plan', err)
      displayErr('We experienced an unexpected error while trying to add your plan. Please try again later.')
    });
}

export const fetchPatientPlan = patientId => dispatch => {
  axios.get(`/api/patient/${patientId}/plan/current`)
    .then(res => {
      if (res.data)
        dispatch(receivePlan(res.data));
    })
    .catch(err => console.error('Unable to fetch plan', err));
}
