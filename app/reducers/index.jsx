import { combineReducers } from 'redux'
import reducerOne from './reducerOne'
import reducerTwo from './reducerTwo'

const rootReducer = combineReducers({
  reducerOne,
  reducerTwo
})

export default rootReducer;
