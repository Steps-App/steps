//React/Redux
import React from 'react';
import {connect} from 'react-redux';
//material-ui
import { FontIcon, Paper } from 'material-ui';
import { StepsTextField, StepsSelectField, StepsMenuItem, StepsActionButton, StepsRaisedButton } from '../material-style';
import { background } from '../colors';
import InfoItem from '../widgets/InfoItem'

export default ({ exercise, treatment, treatmentErrors,
                  addTreatment, resistanceOnChange, treatmentHandler }) => {
  return (
    <div id="new-treatment-form">
      <Paper style={{ backgroundColor: background }} zDepth={2} rounded={false}>
        <div className="new-treatment">
          <div className="new-treatment-exercise">
            <img src={exercise && exercise.img_url} className="img-responsive"/>
            <div className="exercise-info">
              <h3>{exercise && exercise.title}</h3>
              <InfoItem icon="description" label="Description"
                content={exercise && exercise.description} />
            </div>
          </div>
          <div className="treatment-inputs">
            <div className = "treatment-fields">
              <StepsTextField
                floatingLabelFixed={true}
                floatingLabelText="Sets"
                value={treatment.sets}
                errorText={treatmentErrors.sets}
                type="number"
                onChange={(env) => treatmentHandler('sets', env.target.value)} />
              <StepsTextField
                floatingLabelFixed={true}
                floatingLabelText="Reps" type="number"
                value={treatment.reps}
                errorText={treatmentErrors.reps}
                onChange={(env) => treatmentHandler('reps', env.target.value)} />
              <StepsSelectField
                floatingLabelFixed={true}
                floatingLabelText="Resistance"
                value={treatment.resistance}
                errorText={treatmentErrors.resistance}
                onChange={resistanceOnChange} >
                <StepsMenuItem value='weighted' primaryText='Weighted'/>
                <StepsMenuItem value='none' primaryText='None' />
              </StepsSelectField>
              <StepsTextField
                floatingLabelFixed={true}
                floatingLabelText="Minutes"
                value={treatment.time_per_exercise}
                errorText={treatmentErrors.time_per_exercise}
                type="number"
                onChange={(env) => treatmentHandler('time_per_exercise', env.target.value)} />
            </div>
            <div className="add-button">
              <StepsRaisedButton
                type="submit"
                label="Add"
                fullWidth={true}
                onTouchTap={addTreatment} />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};
