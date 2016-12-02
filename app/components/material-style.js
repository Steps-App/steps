import React from 'react';
import { Link } from 'react-router'
import { Chip, TextField, SelectField, RaisedButton, FloatingActionButton, FlatButton, IconButton, Menu, MenuItem, Tabs, Tab } from 'material-ui';
import { background, tabs, primary, secondary, active, placeholderText, activeInputLabels, textLight, textDark, errorText, disabled } from './colors'

// Shared styles
const tabsBorderRadius = '4px';
const selectedTab = { color: textLight, background: tabs };
const inactiveTab = { color: textDark, background: background };
const roundBorder = tab => {
  if (tab === 'left')
    return { borderTopLeftRadius: tabsBorderRadius }
  else if (tab === 'right')
    return { borderTopRightRadius: tabsBorderRadius }
  else
    return {}
}


// Regular text input
export const StepsTextField = props => (
  <TextField
    floatingLabelStyle={{ color: placeholderText, fontWeight: '500' }}
    floatingLabelFocusStyle={{ color: activeInputLabels }}
    underlineStyle={{ borderBottomColor: placeholderText }}
    underlineFocusStyle={{ borderBottomColor: activeInputLabels }}
    errorStyle={{ color: errorText }}
    { ...props }
  />
);

// Regular dropdown list
export const StepsSelectField = props => (
  <SelectField
    labelStyle={{ color: textDark }}
    floatingLabelStyle={{ color: placeholderText, fontWeight: '500' }}
    iconStyle={{fill: placeholderText}}
    underlineStyle={{ borderBottomColor: placeholderText }}
    underlineDisabledStyle={{ borderBottomColor: disabled }}
    underlineFocusStyle={{ borderBottomColor: activeInputLabels }}
    errorStyle={{ color: errorText }}
    maxHeight={200}
    { ...props } >
    { props.children }
  </SelectField>
);

// Primary button for submitting/confirming data
export const StepsRaisedButton = props => (
  <RaisedButton
    backgroundColor={ props.backgroundColor ? props.backgroundColor : primary }
    labelColor={ textLight }
    style={{ marginTop: '.5em', marginBottom: '.5em', width: '25%' }}
    disableFocusRipple={ true }
    disableTouchRipple={ true }
    { ...props }
  />
);

// Flush buttons inside container elements
export const StepsFlatButton = props => (
  <FlatButton
    label={ props.label }
    labelStyle={{ color: props.textColor, padding: 0, transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' }}
    hoverColor={ props.backgroundColor }
    disableFocusRipple={ true }
    disableTouchRipple={ true }
    { ...props}
  />
);

// Buttons for initiating actions on the page
export const StepsActionButton = props => {
  return (
  <FloatingActionButton
    backgroundColor={ props.backgroundColor ? props.backgroundColor : primary }
    disabledColor={ props.disabledColor ? props.disabledColor : null }
    disabled={ props.disabled ? true: false }
    mini={ props.mini ? true: false }
    onTouchTap={ props.onTouchTap ? props.onTouchTap : null }
    disableFocusRipple={ true }
    disableTouchRipple={ true } >
    { props.children }
  </FloatingActionButton>
)};

export const StepsIconButton = props => {
  return (
  <IconButton
    disableFocusRipple={ true }
    disableTouchRipple={ true }
    { ...props } >
    { props.children }
  </IconButton>
)};

export const StepsMenu = props => (
  <Menu
    style={{ backgroundColor: background }}
    listStyle={{ paddingTop: '0px', paddingBottom: '0px' }}
    selectedMenuItemStyle={{ color: active }}
    { ...props } >
    { props.children }
  </Menu>
)

// Menu item children of Menu
export const StepsMenuItem = props => (
  <MenuItem
    style={{ minHeight: '20px', lineHeight: '20px', padding: '10px 5px' }}
    disableFocusRipple={ true }
    disableTouchRipple={ true }
    { ...props }
  />
);

export const StepsChipRight = (props) => (
  <Chip
    style={{ textAlign: 'right', display: 'block', float: 'right' }}
    { ...props }>
    { props.children }
  </Chip>
)

export const StepsTabs = props => (
  <Tabs
    style={{backgroundColor: background, borderRadius: tabsBorderRadius }}
    inkBarStyle={{backgroundColor:"transparent"}}
    tabItemContainerStyle={{backgroundColor:"transparent"}}
    { ...props } >
    { props.children }
  </Tabs>
);

const TabWrapper = props => (
  <Tab
    style={Object.assign(
      roundBorder(props.tab),
      (props.curTab === props.value ? selectedTab : inactiveTab))}
    disableFocusRipple={ true }
    disableTouchRipple={ true }
    { ...props } >
    { props.children }
  </Tab>
);

TabWrapper.muiName = 'Tab'; // Needed for inheritance hack
export const StepsTab = TabWrapper;
