// import redux, react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontIcon } from 'material-ui';
import { secondary, errorText, primary } from '../colors';

export default (props) => (
  <div className="stat-card">
    <div className="stat-card-data">
      <p className={ props.className ? props.className : '' }>
        { props.number }
        <span>{ props.units }</span>
      </p>
      <FontIcon
        color={ props.className === 'good' ? secondary : props.className === 'bad' ? errorText : primary }
        className="material-icons">
        { props.icon }
      </FontIcon>
    </div>
    <p className="stat-card-text">{ props.text }</p>
  </div>
)
