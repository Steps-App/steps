import React from 'react';
import { Link } from 'react-router'
import NavbarTab from './NavbarTab'
import { toolbar, textLight } from '../colors'
import { PATIENT, THERAPIST } from '../../constants'
import { fullName } from '../../utils'

// Material theme
import { ToolbarGroup } from 'material-ui';
import Popover from 'material-ui/Popover/Popover';
import { StepsMenu, StepsMenuItem } from '../material-style'

const navbarTabs = [
  {type: 'patients', role: THERAPIST},
  {type: 'plan', role: PATIENT},
  {type: 'dashboard'},
  {type: 'exercises', role: THERAPIST},
  {type: 'messages', role: PATIENT}
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
              <NavbarTab key={i} type={tab.type} id={user.id} /> : null
          )
        }
        <div className="navbar-item">
          {/* Account Menu popover defined below */}
          <div className="profile-icon"
            onTouchTap={ this.handleAccountMenuOpen }>
            <img
              src={ user.img_URL }
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
            <StepsMenuItem
              primaryText="Account"
              containerElement={ <Link to="/" />} />
            <StepsMenuItem
              primaryText="Sign Out"
              onTouchTap={ logout } />
          </StepsMenu>
        </Popover>
      </ToolbarGroup>
    )
  }
}
