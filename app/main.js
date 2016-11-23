// Libraries
import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// Redux Actions and Thunks
import store from './store'
import { retrieveLoggedInUser } from './reducers/user'
import { loginRedirect } from './utils'

// React Compontents 
import Home from './components/home/Home'
import App from './components/App'
import AddPatientContainer from './components/patients/AddPatientContainer'
import PatientDash from './components/patients/PatientDash'
import Plan from './components/plan/PatientPlan'

// React router hooks
const appEnter = (nextState, replace, callback) => {
  store.dispatch(retrieveLoggedInUser((err, user) => {
    // Home page and logged in -> default app view
    if (!err && nextState.location.pathname === '/')
      replace(loginRedirect(user.role));
    // App page and not logged in -> home page
    else if (err && nextState.location.pathname !== '/')
      replace('/');
    callback();
  }));
}

render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Home } onEnter={ appEnter } />
      <Route path="/app" component={ App } onEnter={ appEnter } >
        <Route path="/plan" component={ Plan } />
        <Route path="/patients/new" component={ AddPatientContainer } />
        <Route path="/patients/dashboard" component={ PatientDash } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
