import React from 'react';

//material-ui
import { StepsTextField, StepsSelectField, StepsMenuItem } from '../material-style';

// Default weeks for the duration dropdown
const weeks = [ 4, 6, 8, 12, 18, 26 ];

export default function({ durationOnChange, therapyHandler, notesOnChange, duration, note, therapyFocus }) {

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
          <StepsSelectField
            id="duration"
            floatingLabelText="Duration"
            maxHeight={200}
            value={duration}
            onChange={durationOnChange}
            style={durationStyle}
          >
          {
            weeks.map(week => <StepsMenuItem value={week} primaryText={`${week} Weeks`}/>)
          }
          </StepsSelectField>
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
