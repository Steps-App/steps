import React from 'react';

//material-ui
import {SelectField, TextField , MenuItem} from "material-ui";

export default function(props){
  let {handleChange, noteHandler, duration, note, injury} = props;

  return (
    <div className='row' id='plan-options'>
      <div className='form' >
          <SelectField id="duration"
          floatingLabelText="Duration"
          maxHeight={200}
          value={duration}
          onChange={((evt,index,value)=> handleChange("duration",value))}
          >
            <MenuItem value={1} primaryText=" 1 Week"/>
            <MenuItem value={2} primaryText=" 2 Week"/>
            <MenuItem value={3} primaryText=" 3 Week"/>
            <MenuItem value={4} primaryText=" 4 Week"/>
            <MenuItem value={5} primaryText=" 5 Week"/>
            <MenuItem value={6} primaryText=" 6 Week"/>
          </SelectField>
        </div>

        <div>
          <SelectField floatingLabelText="Injury" value={injury} onChange={(evt,index,value)=> handleChange("injury",value)}>
            <MenuItem value={1} primaryText='Knee' />
            <MenuItem value={2} primaryText='Shoulder' />
            <MenuItem value={3} primaryText='Lower Back' />
            <MenuItem value={4} primaryText='Upper Back'/>
            <MenuItem value={5} primaryText='Neck'/>
          </SelectField>
        </div>
        <div>
          <TextField hintText="Notes" onChange={noteHandler} value={note}></TextField>
        </div>
    </div>


  );

}
