import React from 'react';
import { Paper } from 'material-ui';
import { background } from '../colors'

// Side Panel container that displays content inside `children` by default
// Also renders and input image and buttons if passed down
export default ({ children, imgURL, buttons }) => (
  <div className="side-panel">
    <Paper style={{ backgroundColor: background }} zDepth={2} rounded={false}>
      <div className="panel-wrapper">
        <div className="panel-content">
          {
            imgURL ? <div className="panel-img"><img src={ imgURL } /></div> : null
          }
          <div className="panel-info">
            { children }
          </div>
        </div>
        {
          buttons && buttons.length ? <div className="panel-buttons">{ buttons }</div> : null
        }
      </div>
    </Paper>
  </div>
);
