import { combineReducers } from 'redux'
import user from './user'
import patients from './patients'

const rootReducer = combineReducers({
  user,
  patients
})

export default rootReducer;
