// Libraries
import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// Redux Actions and Thunks
import store from './store'
import { retrieveLoggedInUser } from './reducers/user'

// React Compontents
import Home from './components/home/Home'
import App from './components/App'
import AddPatientContainer from './components/patients/AddPatientContainer'
import PatientDash from './components/patients/PatientDash'
// import Counter from './components/counter/Counter'  << TO TEST, UNCOMMENT

// React router hooks  << TO TEST COUNTER ROUTE, COMMENT THIS SECTION OUT
const appEnter = (nextState, replace, callback) => {
  store.dispatch(retrieveLoggedInUser())
  // If user is not logged in, redirect them to the home page
  if (!Object.keys(store.getState().user).length)
    replace('/');
  callback();
}

render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Home } />
      <Route path="/app" component={ App } onEnter={ appEnter }> {/* <<< TO TEST, COMMENT OUT onEnter */}
        <Route path="/patients/new" component={ AddPatientContainer } />
        <Route path="/patients/dashboard" component={ PatientDash } />
        {/* <Route path="/counter" component={ Counter } />  << TO TEST, UNCOMMENT */}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
