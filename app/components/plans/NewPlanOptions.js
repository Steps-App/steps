import React from 'react';

//material-ui
import { StepsTextField, StepsSelectField, StepsMenuItem } from '../material-style';

// Default weeks for the duration dropdown
const weeks = [ 4, 6, 8, 12, 18, 26 ];

export default function({ duration, therapyFocus, notes, handleChange, planErrors }) {
  return (
    <div className="new-plan-options">
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <StepsSelectField
            id="duration"
            floatingLabelText="Duration"
            value={duration}
            fullWidth={ true }
            errorText={ planErrors.duration }
            maxHeight={200}
            onChange={(evt, idx, val) => handleChange('duration', val) }
          >
          {
            weeks.map(week => <StepsMenuItem value={week} primaryText={`${week} Weeks`}/>)
          }
          </StepsSelectField>
        </div>

        <div className="col-xs-12 col-sm-6">
          <StepsTextField
            hintText="i.e. Knee Injury"
            value={therapyFocus}
            fullWidth={ true }
            errorText={ planErrors.therapyFocus }
            onChange={(evt) => handleChange('therapyFocus', evt.target.value) }
            floatingLabelText="Therapy Focus"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <StepsTextField
            hintText="Add general plan notes here"
            value={ notes }
            multiLine={ true }
            fullWidth={ true }
            onChange={ (evt) => handleChange('notes', evt.target.value) }
            floatingLabelText="Notes"
            rows={1}
            rowsMax={3}
          />
        </div>
      </div>
    </div>
  );
}
