import React from 'react';
//material-ui
import {Paper} from "material-ui";

export default function(props){

  let {patient} = props;
  let image = (patient.img_url ==="") ?  "../../../src/images/defaultProfile.png" : patient.image;
//Styles
 const imgStyle = {
   'height': '16em',
   'width' : '16em',
 };

 const paperStyle = {
   "height" : '500px',
   'width' : '300px',
   'padding' : '1em',
   'text-align' : 'center'
 };

  return(
    <Paper style={paperStyle} zDepth={1}>
      <div><img style={imgStyle} className="profile" src={image}/>
      </div>
      <div>
        <p>{`First Name ${patient.first_name}`}</p>
        <p>{`Last Name ${patient.last_name}`}</p>
        <p>{`DOB : ${patient.DOB}`} </p>
      </div>
    </Paper>
  );

}
