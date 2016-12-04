import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const RECEIVED_THERAPIST = 'RECEIVED_THERAPIST';

/* ------------   ACTION CREATORS     ------------------ */

export const receivedTherapist  = therapist => ({ type: RECEIVED_THERAPIST, therapist });

/* ------------       REDUCER     ------------------ */

const initialTherapist = {};
export default function reducer(therapist = initialTherapist, action){
  switch (action.type) {
    case RECEIVED_THERAPIST:
      return action.therapist;
    default:
      return therapist;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchTherapist = therapistId => dispatch => {
  console.log(therapistId)
  axios.get(`/api/therapist/${therapistId}`)
    .then(res => dispatch(receivedTherapist(res.data)))
    .catch(err => console.error('Unable to retrieve therapist', err));
};
