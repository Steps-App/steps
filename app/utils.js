import { PATIENT, THERAPIST, PATIENT_ROUTES,
  THERAPIST_ROUTES, THERAPIST_REGEX, PATIENT_REGEX } from './constants.js';
import React from 'react';
import moment from 'moment';

// Check whether script is being run in browser or Node
export const isBrowser = () => {
  try {
    return window;
  } catch (e) {
    return false;
  }
}

// Return formatted full name of user
export const fullName = (user, reverse) =>
  reverse ? `${user.last_name}, ${user.first_name}` : `${user.first_name} ${user.last_name}`;

// Returns the number of days between the input dates
export const daysBetween = (start, end) => {
  const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  return Math.ceil(Math.abs((start.getTime() - end.getTime())/(oneDay)));
}

// Retrieves today's completed workout from the input treatment
// Returns undefined when no workout for today
export const getCompletedWorkout = workouts => {
  return workouts && workouts.find(workout =>
    moment(workout.created_at).format('MM/DD/YYYY') === moment().format('MM/DD/YYYY')
  );
}

// Redirect page for logged in user based on role
export const loginRedirect = role => {
  if (role === THERAPIST) return '/patients';
  else if (role === PATIENT) return '/plan';
  else return '/';
}

// Ensure user is seeing the appropriate side of the app (patient or therapist)
export const checkRoute = (role, route) => {
  if (role === THERAPIST && (THERAPIST_ROUTES.includes(route) || route.match(THERAPIST_REGEX)))
    return true
  if (role === PATIENT && (PATIENT_ROUTES.includes(route) || route.match(PATIENT_REGEX)))
    return true
  console.log('returning false')
  return false
}

// Format an inout amount of seconds into X min XX sec
export const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  const padLeft = (string, pad, length) =>
    (new Array(length+1).join(pad)+string).slice(-length);

  return `${minutes ? `${minutes} min ` : ''}${seconds ? `${padLeft(seconds, '0', 2)} sec` : ''}`;
}

// Return the corresponding pain element with props passed down to SVG
import Pain1 from '../src/images/emojis/1pain.svg';
import Pain2 from '../src/images/emojis/2pain.svg';
import Pain3 from '../src/images/emojis/3pain.svg';
import Pain4 from '../src/images/emojis/4pain.svg';
import Pain5 from '../src/images/emojis/5pain.svg';
export const painEmoji = (painLevel, props) => {
  if (typeof painLevel === 'string') painLevel = Number(painLevel);
  switch(painLevel) {
    case 1:
      return <Pain1 { ...props }/>
    case 2:
      return <Pain2 { ...props }/>
    case 3:
      return <Pain3 { ...props }/>
    case 4:
      return <Pain4 { ...props }/>
    case 5:
      return <Pain5 { ...props }/>
    default:
      return null;
  }
}
