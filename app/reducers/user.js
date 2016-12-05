import axios from 'axios';
import { browserHistory } from 'react-router';
import { isBrowser, loginRedirect } from '../utils'

// Other related actions
import { removePatient } from './currentpatient'
import { removeExercises } from './exercises'
import { removePatients } from './patients'
import { removePlan } from './plan'
import { removeTherapist } from './therapist'

/* -----------------    ACTIONS     ------------------ */

export const SET_USER    = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

/* ------------   ACTION CREATORS     ------------------ */

export const setUser   = user => ({ type: SET_USER, user })
export const removeUser  = () => ({ type: REMOVE_USER })

/* ------------       REDUCER     ------------------ */

const initialUser = {};
export default function reducer(currentUser = initialUser, action) {
  console.log(action)
  switch (action.type) {
    case SET_USER:
      return action.user;
    case REMOVE_USER:
      return initialUser;
    default:
      return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const login = (credentials, displayErr) => dispatch => {
  axios.post('/api/auth/login', credentials)
    .then(res => {
      dispatch(setUser(res.data));
      if (isBrowser())
        browserHistory.push(loginRedirect(res.data.role));
    })
    .catch(err => {
      console.error('Unable to log in', err)
      displayErr(err.response.data);
    });
}

export const signup = (credentials, displayErr) => dispatch => {
  axios.post('/api/auth/signup', credentials)
    .then(res => {
      dispatch(setUser(res.data));
      if (isBrowser())
        browserHistory.push(loginRedirect(res.data.role));
    })
    .catch(err => {
      console.error('Unable to sign up', err)
      displayErr(err.response.data);
    });
}

export const retrieveLoggedInUser = (cb) => dispatch => {
  axios.get('/api/auth/me')
    .then(res => {
      if (res.status !== 204) {
        dispatch(setUser(res.data));
      }
      cb(null, res.data)
    })
    .catch(cb);
}

export const logout = () => dispatch => {
  axios.delete('/api/auth/logout')
    .then(() => {
      dispatch(removeUser());
      dispatch(removeTherapist());
      dispatch(removePlan());
      dispatch(removeExercises());
      dispatch(removePatients());
      dispatch(removePatient());
      if (isBrowser())
        browserHistory.push('/');
    })
    .catch(err => console.error('Unable to logout', err));
}
