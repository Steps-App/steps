import React from 'react';
import { Link } from 'react-router';
import { StepsTextField, StepsSelectField, StepsMenuItem, StepsRaisedButton, StepsActionButton } from '../material-style';
import { primary, errorText, background } from '../colors';
import { FontIcon, Paper } from 'material-ui';

export default ({ handleChange, handleSubmit, open, errors}) => {
  return (
    <div id="add-exercise" style={{ textAlign: 'center' }} >
    {
      !open ?
      <StepsRaisedButton
          label="Add New Exercise"
          onClick={ () => handleChange('open', true) }
          backgroundColor={primary}
        /> :
      <Paper style={{ backgroundColor: background }} zDepth={2} rounded={false}>
          <form onSubmit={ handleSubmit }>
            <h2 style={{ 'textAlign': 'left', paddingTop: "20px", paddingLeft: "20px", margin: "0" }}>New Exercise</h2>
              <div className="col-xs-12">
                <StepsTextField
                  floatingLabelText="Title"
                  errorText={ errors.title }
                  fullWidth={ true }
                  onChange={(evt) => handleChange("title", evt.target.value) }
                />
              </div>
           
          
              <div className="col-xs-12">
                <StepsTextField
                  floatingLabelText="Description"
                  errorText={ errors.description }
                  fullWidth={ true }
                  onChange={(evt) => handleChange("description", evt.target.value) }
                />
              </div>
           
            
           
              <div className="col-xs-12">
                <StepsTextField
                  floatingLabelText="Image URL"
                  fullWidth={true}
                  errorText={ errors.imgUrl }
                  onChange={(evt) => handleChange("imgUrl", evt.target.value) }
                />
              </div>
         

         
              <div className="col-xs-12">
                <StepsTextField
                  floatingLabelText="Video URL"
                  fullWidth={true}
                  onChange={(evt) => handleChange("vidUrl", evt.target.value) }
                />
              </div>
           

          <div style={{ textAlign: 'center' }}>
            <div className="submit-button">
            <StepsRaisedButton
              label="Submit"
              type="submit"
              backgroundColor= {primary}
            />
            </div>
            <div className="cancel-button">
            <StepsRaisedButton
              label="Cancel"
              onTouchTap={ () => handleChange('open', false) }
              backgroundColor={errorText}
              />
            </div>  
          </div> 
        </form> 
      </Paper>
    }
    </div>
  )
};
