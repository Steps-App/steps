// React
import React from 'react';
// Testing Tools
import {expect} from 'chai';
import {shallow} from 'enzyme';

/* -=-=-=-= Components being tested =-=-=-=-=-*/

// TestFields
import {StepsTextField} from '../app/components/material-style.js';
// Buttons
import {StepsRaisedButton, StepsFlatButton, StepsActionButton, StepsIconButton} from '../app/components/material-style.js';
// Drop Downs of Some type
import {StepsMenu, StepsMenuItem} from '../app/components/material-style.js';
// Tabs
import {StepsTabs, TabWrapper} from '../app/components/material-style.js';

/* -=-=-=-= App Standized Colors =-=-=-=-=- */
import { background, tabs, primary, secondary, active, placeholderText, activeInputLabels, textLight, textDark, errorText, disabled } from '../app/components/colors';



/* -=-=-=-=-=-=-=  Test =-=-=-=-=-=-=-=--=-= */
describe(' StepsTextField Style Wrapper component',() =>{

  let TextField = shallow(<StepsTextField type={"text"} hintText="Hint" rows={2}/> );

  it('Uses the correct colors from material-style file',()=>{
    console.log(TextField);

  });


});
