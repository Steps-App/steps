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
import {StepsMenu, StepsMenuItem, StepsSelectField} from '../app/components/material-style.js';
// Tabs
import {StepsTabs, TabWrapper} from '../app/components/material-style.js';

/* -=-=-=-= App Standized Colors =-=-=-=-=- */
import { background, tabs, primary, secondary, active, placeholderText, activeInputLabels, textLight, textDark, errorText, disabled } from '../app/components/colors';



/* -=-=-=-=-=-=-=  Test =-=-=-=-=-=-=-=--=-= */

describe('Custom Wrapped Material-Style Components',() => {

  /* --- StepsTextField --- */
    describe('StepsTextField Style Wrapper component',() =>{

      it('StepsTextField defaults with the style given with wrapper',() =>{

        let TextField = shallow(<StepsTextField/> );

        it('Uses the correct colors from material-style file',()=>{
          let TextFieldprops = TextField.node.props;

          let defaultProps = {
              floatingLabelStyle:{ color: placeholderText, fontWeight: '500' },
              floatingLabelFocusStyle:{ color: activeInputLabels },
              floatingLabelFixed: false,
              underlineStyle:{ borderBottomColor: placeholderText },
              underlineFocusStyle:{ borderBottomColor: activeInputLabels },
              errorStyle:{ color: errorText },
              disabled: false,
              fullWidth: false,
              rows : 1,
              type : "text",
              underlineShow: true,
              multiLine: false
            };
          expect(TextFieldprops).to.deep.equal(defaultProps);
        });
      });

      it("StepsTextField will change as you pass new props in",()=>{
        let TextField = shallow(<StepsTextField type={'number'} multiLine={true} fullWidth={true}  hintText="Hint" rows={2}/> );

        let customProps = {
          rows : 2,
          fullWidth : true,
          hintText : "Hint",
          multiLine : true,
          type : 'number'
        };


        let TextFieldprops = TextField.node.props;

        expect(TextFieldprops.rows).to.be.equal(customProps.rows);
        expect(TextFieldprops.fullWidth).to.be.equal(customProps.fullWidth);
        expect(TextFieldprops.hintText).to.be.equal(customProps.hintText);
        expect(TextFieldprops.type).to.be.equal(customProps.type);
        expect(TextFieldprops.multiLine).to.be.equal(customProps.multiLine);

      });

      it("StepsTextField accepts any number of extra props", () => {
        let TextField = shallow(<StepsTextField
                                  style={{height:"500vh", margin: "2vh"}}
                                  hintstyle={{backgroundColor: "blue"}}
                                  rowsMax={4}
                                /> );
        let extraProps = {
          style : {height:"500vh", margin: "2vh"},
          hintstyle: {backgroundColor: "blue"},
          rowsMax :4
        };
        let textFieldProps = TextField.node.props;
        expect(textFieldProps).to.have.any.keys('style','hintstyle','rowsMax');
        expect(textFieldProps.style).to.deep.equal(extraProps.style);
        expect(textFieldProps.hintstyle).to.deep.equal(extraProps.hintstyle);
        expect(textFieldProps.rowsMax).to.be.equal(extraProps.rowsMax);
      });
    });

  //BUTTONS
  /* --- StepsFlatButton ---*/
    describe('StepsFlatButton Style Wrapper Component', () => {

    });

  /* --- StepsIconButton ---*/
  describe("StepsIconButton Style Wrapper Component", () =>{

  });

  /* --- StepsActionButton ---*/
  describe("StepsActionButton Style Wrapper Component", () =>{

  });

  /* --- StepsMenuItem ---*/
  describe("StepsMenuItem Style Wrapper Component", () =>{

  });

  /* --- StepsMenu ---*/
  describe("StepsMenu Style Wrapper Component", () =>{

  });

  /* --- StepsSelectField ---*/
  describe("StepsSelectField Style Wrapper Component", () =>{

  });

  /* --- StepsTab ---*/
  describe("StepsTab Style Wrapper Component", () =>{

  });

  /* --- StepsTabs ---*/
  describe("StepsTabs Style Wrapper Component", () =>{

  });

});
