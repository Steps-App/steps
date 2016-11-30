import React from 'react';

//material-ui
import { StepsTextField, StepsSelectField, StepsMenuItem } from '../material-style';

// Default weeks for the duration dropdown
const weeks = [ 4, 6, 8, 12, 18, 26 ];

export default function({ duration, handleChange, planErrors }) {
  return (
    <div className="new-plan-options">
      <StepsSelectField
        id="duration"
        floatingLabelText="Duration"
        errorText={ planErrors.duration }
        maxHeight={200}
        value={duration}
        onChange={(evt, idx, val) => handleChange('duration', val) }
      >
      {
        weeks.map(week => <StepsMenuItem value={week} primaryText={`${week} Weeks`}/>)
      }
      </StepsSelectField>

      <StepsTextField
        hintText="i.e. Knee Injury"
        multiLine={true}
        errorText={ planErrors.therapyFocus }
        onChange={(evt) => handleChange('therapyFocus', evt.target.value) }
        floatingLabelText="Therapy Focus"
      />

      <StepsTextField
        hintText="Add general plan notes here"
        multiLine={true}
        onChange={(evt) => handleChange('notes', evt.target.value) }
        floatingLabelText="Notes"
        rows={1}
        rowsMax={6}
      />
    </div>
  );
}
