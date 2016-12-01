import React from 'react';
import { Link } from 'react-router';
import { StepsTextField, StepsSelectField, StepsMenuItem, StepsRaisedButton } from '../material-style';

export default ({ handleChange, handleSubmit, open, errors}) => {
  return (
    <div id="add-exercise">
    {
      !open ?
        <StepsRaisedButton
          label="Add New Exercise"
          onClick={ () => handleChange('open', true) }
          backgroundColor="#005B96"
        /> :
        <form onSubmit={ handleSubmit }>
          <fieldset className="form-box">
          <legend style={{width: '145px'}}>New Exercise</legend>
            <div className="row">
              <div className="col-xs-12">
                <StepsTextField
                  floatingLabelText="Title"
                  errorText={ errors.title }
                  fullWidth={ true }
                  onChange={(evt) => handleChange("title", evt.target.value) }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <StepsTextField
                  floatingLabelText="Description"
                  errorText={ errors.description }
                  fullWidth={ true }
                  onChange={(evt) => handleChange("description", evt.target.value) }
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-xs-12">
                <StepsTextField
                  floatingLabelText="Image URL"
                  fullWidth={true}
                  errorText={ errors.img_url }
                  onChange={(evt) => handleChange("img_url", evt.target.value) }
                />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <StepsTextField
                  floatingLabelText="Video URL"
                  fullWidth={true}
                  onChange={(evt) => handleChange("vid_url", evt.target.value) }
                />
              </div>
            </div>

          </fieldset>
          <StepsRaisedButton
            label="Submit"
            type="submit"
            backgroundColor="#005B96"
          />
          <StepsRaisedButton
            label="Cancel"
            onClick={ () => handleChange('open', false) }
            backgroundColor="#D9534F"
            />
        </form>
    }
    </div>
  )
};
