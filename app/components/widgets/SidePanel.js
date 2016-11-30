import React from 'react';
import { Paper } from 'material-ui';
import { background } from '../colors'

export default ({ children }) => (
  <div className="info-panel">
    <Paper style={{ backgroundColor: background }} zDepth={2} rounded={false}>
      <div className="info-content">
        { children }
      </div>
    </Paper>
  </div>
);
