import React from 'react';
import { Link } from 'react-router'
import NavbarTab from './NavbarTab'
import { toolbar, textLight } from '../colors'
import { PATIENT, THERAPIST } from '../../constants'
import { fullName } from '../../utils'

// Material theme
import { ToolbarGroup } from 'material-ui';
import Popover from 'material-ui/Popover/Popover';
import { StepsMenu, StepsPopoverMenuItem } from '../material-style'

const navbarTabs = [
  {type: 'patients', role: THERAPIST},
  {type: 'exercises', role: THERAPIST},
  {type: 'dashboard', role: PATIENT},
  {type: 'messages'}
]

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
        {
          navbarTabs.map((tab, i) =>
            !tab.role || tab.role === user.role ?
              <NavbarTab type={tab.type} /> : null
          )
        }
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
          <StepsMenu>
            <StepsPopoverMenuItem
              primaryText="Account"
              containerElement={ <Link to="/" />} />
            <StepsPopoverMenuItem
              primaryText="Sign Out"
              onTouchTap={ logout } />
          </StepsMenu>
        </Popover>
      </ToolbarGroup>
    )
  }
}
