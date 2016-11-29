import React from 'react';
import { Paper } from "material-ui";
import moment from 'moment';

export default ({ patient }) => {
  //Styles
  const paperStyle = {
    'padding' : '1em',
    'textAlign' : 'center'
  };

  return(
    <Paper style={paperStyle} zDepth={1}>
      <div>
        <img className="profile" src={patient.img_URL} />
      </div>
      <div>
        <p>{`First Name : ${patient.first_name}`}</p>
        <p>{`Last Name : ${patient.last_name}`}</p>
        <p>{`DOB : ${moment(patient.DOB).format('MMM Do, YYYY')}`} </p>
      </div>
    </Paper>
  );
}
