import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const SET_TREATMENT   = 'SET_TREATMENT';
export const UNSET_TREATMENT = 'UNSET_TREATMENT';

/* ------------   ACTION CREATORS     ------------------ */

export const setTreatment  = treatmentId => ({ type: SET_TREATMENT, treatmentId });
export const unsetTreatment  = () => ({ type: UNSET_TREATMENT });

/* ------------       REDUCER     ------------------ */

const inititalTreatmentId = null;
export default function reducer(currentTreatmentId = inititalTreatmentId, action) {
  switch (action.type) {
    case SET_TREATMENT:
      return action.treatmentId;
    case UNSET_TREATMENT:
      return inititalTreatmentId;
    default:
      return currentTreatmentId;
  }
}
