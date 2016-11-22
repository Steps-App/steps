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

// React router hooks
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
      <Route path="/app" component={ App } onEnter={ appEnter }>
        <Route path="/patients/new" component={ AddPatientContainer } />
        <Route path="/patients/dashboard" component={ PatientDash } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
