import { combineReducers } from 'redux';
import user from './user';
import patients from './patients';
import exercises from './exercises';
import plan from './plan';
import currentPatient from './currentpatient';
import therapist from './therapist';

const rootReducer = combineReducers({
  user,
  patients,
  exercises,
  plan,
  currentPatient,
  therapist
});

export default rootReducer;
