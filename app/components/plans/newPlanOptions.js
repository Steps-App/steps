import React from 'react';

//material-ui
import {SelectField, TextField , MenuItem} from "material-ui";

import {StepsTextField} from '../material-style';

export default function(props){
  let {handleChange, noteHandler, duration, note, injury} = props;



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
          <SelectField id="duration"
          floatingLabelText="Duration"
          maxHeight={200}
          value={duration}
          onChange={(evt,index,value) => handleChange("duration",value)}
          style={durationStyle}>
            <MenuItem value={1} primaryText=" 1 Week"/>
            <MenuItem value={2} primaryText=" 2 Week"/>
            <MenuItem value={3} primaryText=" 3 Week"/>
            <MenuItem value={4} primaryText=" 4 Week"/>
            <MenuItem value={5} primaryText=" 5 Week"/>
            <MenuItem value={6} primaryText=" 6 Week"/>
          </SelectField>
        </div>

        <div className='col-md-4'>
          <SelectField floatingLabelText="Injury" value={injury} onChange={(evt,index,value)=> handleChange("injury",value)} style={injuryStyle}>
            <MenuItem value={1} primaryText='Knee' />
            <MenuItem value={2} primaryText='Shoulder' />
            <MenuItem value={3} primaryText='Lower Back' />
            <MenuItem value={4} primaryText='Upper Back'/>
            <MenuItem value={5} primaryText='Neck'/>
          </SelectField>
        </div>

        <div className='col-md-4'>
          <StepsTextField hintText="Notes"
              multiLine={true}
              onChange={noteHandler}
              value={note}
              floatingLabelText="Additional Notes"
              rows={1}
              rowsMax={6}
              />
        </div>
    </div>


  );

}
