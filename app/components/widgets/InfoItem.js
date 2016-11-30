import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';

export default ({ icon, iconColor, label, content }) => (
  <div className="info-item">
  {
    icon ?
      <FontIcon className="material-icons"
        color={iconColor ? iconColor : 'black'}
        style={{marginRight: '5px', fontSize: '20px'}}>{ icon }</FontIcon> : null
  }
    <p><span>{`${label}:`}&nbsp;</span>{ content }</p>
  </div>
);
