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
import NewPlanContainer from './components/plans/NewPlanContainer';
import Plan from './components/plans/Plan';
import PatientPlan from './components/plan/PatientPlan';
import Counter from './components/plan/Counter';
import PatientListContainer from './components/patients/PatientListContainer';
import Dashboard from './components/dashboard/Dashboard';
import Treatment from './components/treatment/Treatment'
import ChatRoom from './components/chat/ChatRoom'
import ExerciseListContainer from './components/exercises/ExerciseListContainer'
import { loginRedirect } from './utils'


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
  if(store.getState().patients.find(patient => patient.id == nextState.params.patientId )) {
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

const workoutEnter = (nextState, replace) => {
  const curPlan = store.getState().plan;
  if (!Object.keys(curPlan).length || !curPlan.treatments.find(treatment => treatment.id == nextState.params.treatmentId))
    replace('/plan');
};

const therapistPlanEnter = (nextState) => {
  const curPlan = store.getState().plan;
  if (!Object.keys(curPlan).length) {
    store.dispatch(fetchCurrentPatient(nextState.params.patientId))
    store.dispatch(fetchPatientPlan(nextState.params.patientId))
    store.dispatch(fetchExercises(store.getState().user.id))
  }
};

const patientsListEnter = () => store.dispatch(fetchPatients(store.getState().user.id));

const exerciseListEnter = () => store.dispatch(fetchExercises(store.getState().user.id))

render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Home } onEnter={ appEnter } />
      <Route path="/app" component={ App } onEnter={ appEnter } >
        <Route path="/plan" component={ PatientPlan } onEnter={ patientPlanEnter } />
        <Route path="/plan/treatments/:treatmentId" component= { Treatment } />
        <Route path="/plan/treatments/:treatmentId/workout" component={ Counter } onEnter={ workoutEnter } />
        <Route path="/exercises" component={ ExerciseListContainer } onEnter={ exerciseListEnter } />
        <Route path="/dashboard" component={ Dashboard } onEnter={ patientPlanEnter } />
        <Route path="/patients" component={ PatientListContainer } onEnter={ patientsListEnter } />
        <Route path="/patients/new" component={ AddPatientContainer } />
        <Route path="/patients/:patientId/plans/new" component={NewPlanContainer} onEnter={newPlanEnter} />
        <Route path="/patients/dashboard" component={ Dashboard } />
        <Route path="/messages" component={ ChatRoom } />
        <Route path="/patients/:patientId/plans/current" component={ Plan } onEnter={therapistPlanEnter} confirm={false} />
        <Route path="/patients/:patientId/plans/confirmation" component={Plan} confirm={true} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
