import { combineReducers } from 'redux'
import user from './user'
import patients from './patients'
import exercises from './exercises'
import plan from './plan'

const rootReducer = combineReducers({
  user,
  patients,
  exercises,
  plan
})

export default rootReducer;
