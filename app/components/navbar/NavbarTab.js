import React from 'react';
import { Link } from 'react-router'
import { StepsFlatButton } from '../material-style';
import { toolbar, textLight } from '../colors'

// Regular text input
export default props => (
  <div className="navbar-item">
    <Link to="/">
      <StepsFlatButton
        label={ props.label }
        textColor={ textLight }
        backgroundColor={ toolbar } />
      <div className={`navbar-item-icon ${props.imgClass}`} />
    </Link>
  </div>
)
