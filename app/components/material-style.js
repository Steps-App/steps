import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { primary, placeholderText, activeInputLabels, textLight, errorText } from './colors'

// Regular text input
export const TherapyTextField = props => (
  <TextField
    floatingLabelStyle={{ color: placeholderText, fontWeight: '500' }}
    floatingLabelFocusStyle={{ color: activeInputLabels }}
    underlineStyle={{ borderBottomColor: placeholderText }}
    underlineFocusStyle={{ borderBottomColor: activeInputLabels }}
    errorStyle={{ color: errorText }}
    { ...props }
  />
);

// Primary button
export const TherapyRaisedButton = props => (
  <RaisedButton
    backgroundColor={primary}
    labelColor={textLight}
    style={{ marginTop: '.5em', marginBottom: '.5em', width: '25%' }}
    { ...props }
  />
);
