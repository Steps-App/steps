// Libraries
import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Redux Actions and Thunks
import store from './store';

// React Compontents
import Home from './components/home/Home';
import App from './components/App';
import AddPatientContainer from './components/patients/AddPatientContainer';
import newPlansContainer from './components/plans/newplan';


// React router hooks
const appEnter = (nextState, replace, callback) => {
  // hit /api/auth/me to get logged in user
  // If user is not logged in, redirect them to the home page
  if (!Object.keys(store.getState().user).length)
    replace('/');
  callback();
};

const newPlanEnter = (nextState) => {
  // retrieves all exercises available


};




render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Home } />
      <Route path="/app" component={ App } onEnter={ appEnter }>
        <Route path="/patients/new" component={ AddPatientContainer } />
        <Route path="/plans/new" component={newPlansContainer} onEnter={newPlanEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
