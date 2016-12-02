import React from 'react';
import { Link } from 'react-router'
import { StepsFlatButton } from '../material-style';
import { toolbar, textLight } from '../colors'

// Regular text input
export default props => (
  <div className="navbar-item">
    <Link to={ props.type === 'messages' ? `/${props.type}/${props.id}` : `${props.type}` }>
      <StepsFlatButton
        label={ props.type.charAt(0).toUpperCase() + props.type.slice(1) }
        textColor={ textLight }
        backgroundColor={ toolbar } />
      <div className={`navbar-item-icon ${props.type}`} />
    </Link>
  </div>
)
