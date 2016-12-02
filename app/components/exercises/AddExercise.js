import React from 'react';
import { Link } from 'react-router';
import { StepsTextField, StepsRaisedButton, StepsActionButton } from '../material-style';
import { errorText, background } from '../colors';
import { FontIcon, Paper } from 'material-ui';

export default ({ handleChange, handleSubmit, open, errors}) => {
  console.log('open', open)
  return (
    <div id="add-exercise">
    {
      !open ?
      <div className="add-exercise-button">
        <p> Add new exercise </p>
        <StepsActionButton onTouchTap={ () => handleChange('open', true) }>
          <FontIcon className={'material-icons'}>add</FontIcon>
        </StepsActionButton>
      </div> :
      <Paper style={{ backgroundColor: background }} zDepth={2} rounded={false}>
        <h2>New Exercise</h2>
        <form className="add-exercise-form" onSubmit={ handleSubmit }>
          <StepsTextField
            floatingLabelText="Title"
            errorText={ errors.title }
            fullWidth={ true }
            onChange={(evt) => handleChange("title", evt.target.value) }
          />
          <StepsTextField
            floatingLabelText="Description"
            errorText={ errors.description }
            fullWidth={ true }
            onChange={(evt) => handleChange("description", evt.target.value) }
          />
          <StepsTextField
            floatingLabelText="Image URL"
            fullWidth={true}
            errorText={ errors.imgUrl }
            onChange={(evt) => handleChange("imgUrl", evt.target.value) }
          />
          <StepsTextField
            floatingLabelText="Video URL"
            fullWidth={true}
            onChange={(evt) => handleChange("vidUrl", evt.target.value) }
          />
          <div className="add-exercise-buttons">
            <StepsRaisedButton
              label="Submit"
              type="submit"
            />
            <StepsRaisedButton
              label="Cancel"
              onTouchTap={ () => handleChange('open', false) }
              backgroundColor={errorText}
              />
          </div>
          {
            // Error message when display when issue submitting
            errors.submit ?
            <p className="error-message">{ errors.submit }</p> : null
          }
        </form> 
      </Paper>
    }
    </div>
  )
};
