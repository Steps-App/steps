import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import NavbarMenu from './NavbarMenu'
import { logout } from '../../reducers/user'
import { toolbar, textLight } from '../colors'
import { loginRedirect } from '../../utils'
import Logo from '../../../src/images/logo.svg';

// Material theme
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

const Navbar = props => (
  <Toolbar id="navbar" style={{backgroundColor: toolbar}}>
    <ToolbarGroup className="navbar-logo">
      <Link to={!Object.keys(props.user) ? '/' : loginRedirect(props.user.role)}>
        <Logo width="35px" height="22px" />
        <ToolbarTitle style={{fontSize: '30px', color: textLight, padding: 0}} text="Steps" />
      </Link>
    </ToolbarGroup>
    <NavbarMenu { ...props } />
  </Toolbar>
);

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);