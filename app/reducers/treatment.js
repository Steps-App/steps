import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const SET_TREATMENT = 'SET_TREATMENT';

/* ------------   ACTION CREATORS     ------------------ */

export const setTreatment  = treatmentId => ({ type: SET_TREATMENT, treatmentId });

/* ------------       REDUCER     ------------------ */

export default function reducer(currentTreatmentId = null, action) {
  switch (action.type) {
    case SET_TREATMENT:
      return action.treatmentId;
    default:
      return currentTreatmentId;
  }
}
