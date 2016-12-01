//React/Redux
import React from 'react';
import { connect } from 'react-redux';
import NewPlan from './NewPlan';
import { addPlan } from '../../reducers/plan';

const mapStateToProps = ({ currentPatient, exercises, plan }) => ({ currentPatient, exercises, plan });

const mapDispatchToProps = dispatch => ({
  addPlan : newPlan => dispatch(addPlan(newPlan))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPlan);
