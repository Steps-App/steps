import axios from 'axios'
import { browserHistory } from 'react-router'
import { isBrowser } from '../utils'

const initialState = {
  id: 0,
  exercise: {},
  notes: '',
  reps: 0,
  sets: 0,
  time_per_exercise: 0,
  resistance: '',
  plan: {}
}

/* -----------------    ACTIONS     ------------------ */

// const REQUEST_TREATMENT = 'REQUEST_TREATMENT'
const LOAD_TREATMENT = 'LOAD_TREATMENT'

/* ------------   ACTION CREATORS     ------------------ */

export const loadTreatment = (payload) => ({
  type: LOAD_TREATMENT,
  payload
})

/* ------------       REDUCER     ------------------ */

export default function treatmentReducer(treatment = initialState, action) {
  switch (action.type) {
    case LOAD_TREATMENT:
      return Object.assign({}, treatment, {
        id: action.payload.treatment.id,
        exercise: action.payload.treatment.exercise,
        notes: action.payload.treatment.notes,
        reps: action.payload.treatment.reps,
        sets: action.payload.treatment.sets,
        resistance: action.payload.treatment.resistance,
        time_per_exercise: action.payload.treatment.time_per_exercise,
        plan: action.payload.plan
      })
    default:
      return treatment
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchTreatment = (patientId, planId, treatmentId) => (dispatch) => {
  axios.get(`/api/patient/${patientId}/plan/${planId}/treatment/${treatmentId}`)
    .then(result => {
      dispatch(loadTreatment(result.data))
    })
    .catch(err => console.error(err))
}
