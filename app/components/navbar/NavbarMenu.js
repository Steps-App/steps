import React from 'react';
import { Link } from 'react-router'
import { toolbar, textLight } from '../colors'
import { fullName } from '../../utils'

// Material theme
import { ToolbarGroup } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';

// Material CSS rules
const buttonText = {
  color: textLight,
  padding: 0,
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
}

export default class NavbarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleAccountMenuOpen = this.handleAccountMenuOpen.bind(this);
    this.handleAccountMenuClose = this.handleAccountMenuClose.bind(this);
  }

  handleAccountMenuOpen(evt) {
    evt.preventDefault();
    this.setState({
      open: true,
      anchorEl: evt.currentTarget
    });
  }

  handleAccountMenuClose() {
    this.setState({ open: false });
  }

  render() {
    const { user, logout } = this.props;
    return (
      <ToolbarGroup style={{float: 'right'}}>
        <div className="navbar-item">
          <Link to="/">
            <FlatButton
              label="Patients" labelStyle={buttonText}
              hoverColor={toolbar} rippleColor={toolbar}
            />
            <div className="navbar-item-icon patients" />
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/">
            <FlatButton
              label="Exercises" labelStyle={buttonText}
              hoverColor={toolbar} rippleColor={toolbar}
            />
            <div className="navbar-item-icon exercises" />
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/">
            <FlatButton
              label="Messages" labelStyle={buttonText}
              hoverColor={toolbar} rippleColor={toolbar}
            />
            <div className="navbar-item-icon messages" />
          </Link>
        </div>
        <div className="navbar-item">
          {/* Account Menu popover defined below */}
          <div className="profile-icon"
            onTouchTap={ this.handleAccountMenuOpen }>
            <img
              src={ user.img_url }
              alt={ fullName(user) } />
          </div>
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          targetOrigin={{vertical: 'top', horizontal: 'right'}}
          onRequestClose={this.handleAccountMenuClose}>
          <Menu>
            <MenuItem
              primaryText="Account"
              style={{ minHeight: '20px', lineHeight: '20px', padding: '5px' }}
              containerElement={<Link to="/" />} />
            <MenuItem
              primaryText="Sign Out"
              style={{ minHeight: '20px', lineHeight: '20px', padding: '5px' }}
              onClick={ logout } />
          </Menu>
        </Popover>
      </ToolbarGroup>
    )
  }
}


            // <img
            //   className="navbar-item-icon"
            //   src="images/patients.png"
            //   alt="Patients" />
