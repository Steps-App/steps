import React from 'react';
//material-ui
import {Paper} from "material-ui";

export default function(props){

  let {patient} = props;
  console.log(props, patient)
//  let image = (patient.img_url === "") ?  "../../../src/images/defaultProfile.png" : patient.img_url;
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
        <p>{`First Name ${patient.first_name}`}</p>
        <p>{`Last Name ${patient.last_name}`}</p>
        <p>{`DOB : ${patient.DOB}`} </p>
      </div>
    </Paper>
  );

}
