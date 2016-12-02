import React from 'react';
import { Dialog} from 'material-ui';
import { StepsFlatButton } from '../material-style';
import { primary, errorText } from '../colors';

export default ({ title, isOpen, confirm, dialogClose, children }) => {
  const actions = [
    <StepsFlatButton
      label="Cancel"
      textColor={ errorText }
      onTouchTap={ dialogClose }
    />,
    <StepsFlatButton
      label="Confirm"
      textColor={ primary }
      keyboardFocused={true}
      onTouchTap={()=>{
        confirm();
        dialogClose();
      }}
    />
  ];

  return (
    <Dialog
      title={ title }
      actions={ actions }
      modal={ false }
      open={ isOpen }
      onRequestClose={ dialogClose } >
      { children }
    </Dialog>
  )
}
