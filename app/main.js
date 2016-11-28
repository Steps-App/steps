// Libraries
import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Redux Actions and Thunks
import store from './store';
import { retrieveLoggedInUser } from './reducers/user';
import { fetchExercises } from './reducers/exercises';
import { fetchPatientPlan } from './reducers/plan';
import { fetchPatients } from './reducers/patients';
import { fetchCurrentPatient } from './reducers/currentpatient';

// React Compontents
import Home from './components/home/Home';
import App from './components/App';
import AddPatientContainer from './components/patients/AddPatientContainer';
import newPlansContainer from './components/plans/newPlanContainer';
import PlanConfirmContainer from './components/plans/PlanConfirmContainer';
import Plan from './components/plan/PatientPlan';
import PatientListContainer from './components/patients/PatientListContainer';
import PatientDash from './components/patients/PatientDash';
import { loginRedirect } from './utils';

// ===== OnEnters =====
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
};

const newPlanEnter = (nextState, replace) => {
  // Check if patientId matches a patient on State, grab exercises for the therapist
  // otherwise, redirect to /patients
  if (store.getState().patients.find(patient => patient.id == nextState.params.patientId )) {
    store.dispatch(fetchExercises(store.getState().user.id));
    store.dispatch(fetchCurrentPatient(nextState.params.patientId));
  } else replace('/patients');
};

// If no plan on the state, fetch patient's plan
const patientPlanEnter = () => {
  const curPlan = store.getState().plan;
  if (!Object.keys(curPlan).length)
    store.dispatch(fetchPatientPlan(store.getState().user.id));
};

// const planConfirm = (nextState) => {
//    //next state in () + store.dispatch(fetchPatientPlan(nextState.params.patientId));
//    //store.dispatch(fetchCurrentPatient(3));
//    store.dispatch(fetchCurrentPatient(nextState.params.patientId));
// };

const patientsListEnter = () => store.dispatch(fetchPatients(store.getState().user.id));


render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Home } onEnter={ appEnter } />
      <Route path="/app" component={ App } onEnter={ appEnter } >
        <Route path="/plan" component={ Plan } onEnter={ patientPlanEnter }/>
        <Route path="/patients" component={ PatientListContainer } onEnter={ patientsListEnter } />
        <Route path="/patients/new" component={ AddPatientContainer } />
        <Route path="/patients/:patientId/plans/new" component={newPlansContainer} onEnter={newPlanEnter} />
        <Route path="/patients/:patientId/plans/confirmation" component={PlanConfirmContainer} />
        <Route path="/patients/dashboard" component={ PatientDash } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

{/* <Route path="/patients/:patientId/plans/new" component={newPlansContainer} onEnter={newPlanEnter} /> */}
