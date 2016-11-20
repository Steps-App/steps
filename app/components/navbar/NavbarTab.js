import React from 'react';
import { Link } from 'react-router'
import { TherapyFlatButton } from '../material-style';
import { toolbar, textLight } from '../colors'

// Regular text input
export default props => (
  <div className="navbar-item">
    <Link to="/">
      <TherapyFlatButton
        label={ props.label }
        textColor={ textLight } />
      <div className={`navbar-item-icon ${props.imgClass}`} />
    </Link>
  </div>
)
