import { combineReducers } from 'redux'
import user from './user'
import patients from './patients'
import exercises from './exercises'
import plan from './plan'
import currentpatient from './currentpatient'

const rootReducer = combineReducers({
  user,
  patients,
  exercises,
  plan,
  currentpatient
})

export default rootReducer;
