import React from 'react';
import { Link } from 'react-router'
import NavbarTab from './NavbarTab'
import { toolbar, textLight } from '../colors'
import { fullName } from '../../utils'

// Material theme
import { ToolbarGroup } from 'material-ui';
import Popover from 'material-ui/Popover/Popover';
import { TherapyMenu, TherapyPopoverMenuItem } from '../material-style'

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
      <ToolbarGroup>
        <NavbarTab label="Patients" imgClass="patients" />
        <NavbarTab label="Exercises" imgClass="exercises" />
        <NavbarTab label="Messages" imgClass="messages" />
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
          <TherapyMenu>
            <TherapyPopoverMenuItem
              primaryText="Account"
              containerElement={ <Link to="/" />} />
            <TherapyPopoverMenuItem
              primaryText="Sign Out"
              onTouchTap={ logout } />
          </TherapyMenu>
        </Popover>
      </ToolbarGroup>
    )
  }
}
