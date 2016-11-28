import React from 'react';

//material-ui
import {SelectField, TextField , MenuItem} from "material-ui";

import {StepsTextField} from '../material-style';

export default function(props){
  let { durationOnChange, therapyHandler, notesOnChange, duration, note, therapyFocus } = props;

// style
 const styleRow = {
   'display' : 'flex',
   'marginTop' : '1em'

 };

 const durationStyle = {
     'width' :'250px',
     'marginRight' : '2em'
 };

 const injuryStyle = {
   'width' :'250px',
   'marginRight' : '2em'
 };


  return (
    <div className='row' style={styleRow} id='plan-options'>
      <div className='col-md-4' >
          <SelectField
            id="duration"
            floatingLabelText="Duration"
            maxHeight={200}
            value={duration}
            onChange={durationOnChange}
            style={durationStyle}
          >
              <MenuItem value={4} primaryText="4 Weeks"/>
              <MenuItem value={6} primaryText="6 Weeks"/>
              <MenuItem value={8} primaryText="8 Weeks"/>
              <MenuItem value={12} primaryText="12 Weeks"/>
              <MenuItem value={18} primaryText="18 Weeks"/>
              <MenuItem value={26} primaryText="26 Weeks"/>
          </SelectField>
        </div>

        <div className='col-md-4'>
          <StepsTextField
            hintText="Knee Injury"
            multiLine={true}
            onChange={therapyHandler}
            value={therapyFocus}
            floatingLabelText="Therapy Focus"
          />
        </div>

        <div className='col-md-4'>
          <StepsTextField
            hintText="Go Slow"
            multiLine={true}
            onChange={notesOnChange}
            value={note}
            floatingLabelText="Notes"
            rows={1}
            rowsMax={6}
          />
        </div>
    </div>


  );

}
