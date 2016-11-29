/* Colors to be used for inline styles by Material UI components */
export const background = '#F8F8F8';
export const toolbar = '#011F4B';
export const tabs = '#011F4B';
export const primary = '#005B96';
export const secondary = '#8D5300';
export const active = '#28A3E1';
export const disabled = '#B3CDE0';
export const placeholderText = '#8C8C8C';
export const activeInputLabels = '#005B96';
export const errorText = '#D9534F';
export const textLight = '#FFFFFF';
export const textDark = '#000000';

// MuiTheme to be used by the entire app
import getMuiTheme from 'material-ui/styles/getMuiTheme';
export const muiTheme = getMuiTheme({}, {
  menuItem: {
    selectedTextColor: active,
  }
});
