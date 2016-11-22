import { PATIENT, THERAPIST } from './constants.js'

// Check whether script is being run in browser or Node
export const isBrowser = () => {
  try {
    return window;
  } catch (e) {
    return false;
  }
}

// Return formatted full name of user
export const fullName = user => `${user.first_name} ${user.last_name}`;

// Redirect page for logged in user based on role
export const loginRedirect = role => {
  if (role === THERAPIST) return '/patients';
  else if (role === PATIENT) return '/plan';
  else return '/';
}
