// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';


//Material UI
import {  } from 'material-ui'
import {  } from '../material-style'


export default (props) => (
  <div className="stat-card">
    <div className="stat-card-data">
      <p>{ props.number }<span>{ props.units }</span></p>
      <img src={require(`../../../src/images/${props.iconPath}`)} /> 
    </div>
    <p className="stat-card-text">{ props.text }</p>
  </div>
)
