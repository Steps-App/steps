//React/Redux
import React from 'react';
import {connect} from 'react-redux';
// == Component ==
import newPlanComponent from './newplan';
// == dispatch ==
import {addPlan} from '../../reducers/plan';

const mapStateToProps = ({ currentPatient, exercises, plan }) => ({ currentPatient, exercises, plan });

const mapDispatchToProps = dispatch => ({
  addPlan : (newPlan) => dispatch(addPlan(newPlan))
});

export default connect(mapStateToProps, mapDispatchToProps)(newPlanComponent);
