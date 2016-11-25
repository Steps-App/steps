//React/Redux
import React from 'react';
import {connect} from 'react-redux';
// == Component ==
import newPlanComponent from './newplan';
// == dispatch ==
import {createPlan} from '../../reducers/plan';



const mapStateToProps = ({ currentPatient, exercises }) => ({ currentPatient, exercises });

const mapDispatchToProps = dispatch => ({
  addPlan : (newPlan) => dispatch(createPlan(newPlan))
});


export default connect(mapStateToProps, mapDispatchToProps)(newPlanComponent);
