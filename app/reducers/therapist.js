import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const RECEIVED_THERAPIST = 'RECEIVED_THERAPIST';
export const REMOVE_THERAPIST = 'REMOVE_THERAPIST';

/* ------------   ACTION CREATORS     ------------------ */

export const receivedTherapist  = therapist => ({ type: RECEIVED_THERAPIST, therapist });
export const removeTherapist  = () => ({ type: REMOVE_THERAPIST })

/* ------------       REDUCER     ------------------ */

const initialTherapist = {};
export default function reducer(therapist = initialTherapist, action){
  switch (action.type) {
    case RECEIVED_THERAPIST:
      return action.therapist;
    case REMOVE_THERAPIST:
      return initialTherapist;
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
