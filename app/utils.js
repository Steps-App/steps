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

// Format an inout amount of seconds into X min XX sec
export const formatTime = time => {
  console.log(time)
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  const padLeft = (string, pad, length) =>
    (new Array(length+1).join(pad)+string).slice(-length);

  return `${minutes} min ${padLeft(seconds,'0',2)} sec`;
}
