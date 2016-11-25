//React/Redux
import React from 'react';
import {connect} from 'react-redux';
// == Component ==
import newPlanComponent from './newplan';
// == dispatch ==
import {createPlan} from '../../reducers/plan';



const mapStateToProps = ({ currentpatient, exercises }) => ({ currentpatient, exercises });

const mapDispatchToProps = dispatch => ({
  createPlan : (newPlan) => dispatch(createPlan(newPlan))
});


export default connect(mapStateToProps, mapDispatchToProps)(newPlanComponent);
