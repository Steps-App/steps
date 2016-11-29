import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import NavbarMenu from './NavbarMenu'
import { logout } from '../../reducers/user'
import { toolbar, textLight } from '../colors'
import { loginRedirect } from '../../utils'

// Material theme
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

const Navbar = props => (
  <Toolbar id="navbar" style={{backgroundColor: toolbar}}>
    <ToolbarGroup className="navbar-logo">
      <Link to={!Object.keys(props.user) ? '/' : loginRedirect(props.user.role)}>
        <svg width="35px" height="22px" viewBox="0 0 204 137">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none">
            <g id="Group" transform="translate(0.000000, -0.362180)" fill="#FFFFFF">
              <path d="M0,108.36218 L204,108.36218 L204,137.36218 L0,137.36218 L0,108.36218 Z M2,110.36218 L202,110.36218 L202,135.36218 L2,135.36218 L2,110.36218 Z" id="Shape"></path>
              <path d="M50,54.36218 L204,54.36218 L204,83.36218 L50,83.36218 L50,54.36218 Z M52,56.36218 L202,56.36218 L202,81.36218 L52,81.36218 L52,56.36218 Z" id="Shape"></path>
              <path d="M100,0.36218 L204,0.36218 L204,29.36218 L100,29.36218 L100,0.36218 Z M102,2.36218 L202,2.36218 L202,27.36218 L102,27.36218 L102,2.36218 Z" id="Shape"></path>
            </g>
          </g>
        </svg>
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