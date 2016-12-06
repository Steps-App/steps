import React from 'react';
import { Link } from 'react-router'
import { StepsFlatButton } from '../material-style';
import { toolbar, textLight } from '../colors'

// Icon SVGs
import Home from '../../../src/images/icons/home.svg';
import Plan from '../../../src/images/icons/plan.svg';
import Patients from '../../../src/images/icons/patients.svg';
import Dashboard from '../../../src/images/icons/dashboard.svg';
import Exercises from '../../../src/images/icons/exercises.svg';
import Messages from '../../../src/images/icons/messages.svg';
import Account from '../../../src/images/icons/account.svg';

const NavbarIcons = ({ type }) => {
  const props = {
    width: "46px",
    height: "40px"
  };
  switch (type) {
    case "home":
      return <Home { ...props }/>
    case "plan":
      return <Plan { ...props }/>
    case "patients":
      return <Patients { ...props }/>
    case "dashboard":
      return <Dashboard { ...props }/>
    case "exercises":
      return <Exercises { ...props }/>
    case "messages":
      return <Messages { ...props }/>
    case "account":
      return <Account { ...props }/>
    default:
      return null;
  }
};

// Regular text input
export default props => (
  <div className="navbar-item">
    <Link to={ props.type === 'messages' ? `/${props.type}/${props.id}` : `${props.type}` }>
      <StepsFlatButton
        label={ props.type.charAt(0).toUpperCase() + props.type.slice(1) }
        textColor={ textLight }
        backgroundColor={ toolbar } />
      {
        <div className="navbar-item-icon">
          <NavbarIcons type={ props.type }/>
        </div>
      }
    </Link>
  </div>
)
