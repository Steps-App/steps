import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const LOAD_TREATMENT = 'LOAD_TREATMENT'

/* ------------   ACTION CREATORS     ------------------ */

export const loadTreatment = (treatment) => ({
  type: LOAD_TREATMENT,
  treatment
})

/* ------------       REDUCER     ------------------ */

export default function treatmentReducer(treatment = null, action) {
  switch (action.type) {
    case LOAD_TREATMENT:
      return Object.assign({}, treatment, { treatment: action.treatment })
    default:
      return treatment
  }
}

/* ------------       DISPATCHERS     ------------------ */
