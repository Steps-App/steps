// React
import React from 'react';
// Testing Tools
import {expect} from 'chai';
import {shallow} from 'enzyme';
import chalk from 'chalk';

/* -=-=-=-= Components being tested =-=-=-=-=-*/

// TestFields
import {StepsTextField} from '../app/components/material-style.js';
// Buttons
import {StepsRaisedButton, StepsFlatButton, StepsActionButton, StepsIconButton} from '../app/components/material-style.js';
// Drop Downs of Some type
import {StepsMenu, StepsMenuItem, StepsSelectField} from '../app/components/material-style.js';
// Tabs
import {StepsTabs, StepsTab} from '../app/components/material-style.js';

/* -=-=-=-= App Standized Colors =-=-=-=-=- */
import { background, tabs, primary, secondary, active, placeholderText, activeInputLabels, textLight, textDark, errorText, disabled } from '../app/components/colors';



/* -=-=-=-=-=-=-=  Test =-=-=-=-=-=-=-=--=-= */

describe('Custom Wrapped Material-Style Components',() => {

  /* --- StepsTextField --- */
    describe('StepsTextField Style Wrapper component :',() =>{

        it('Uses the correct colors from material-style file as default',()=>{
          let TextField = shallow(<StepsTextField/> );
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
                                  rowsMax={4}/>
                                );
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

 // Buttons
  /* --- StepsFlatButton ---*/
    describe('StepsFlatButton Style Wrapper Component :', () => {


      let button = shallow(<StepsFlatButton label={"Finish"}/>);
      let btprops = button.node.props;
      let undefined;
        it('StepsFlatButton requires a label',()=>{
           expect(btprops.label).to.deep.equal("Finish");
         });
        it("StepsFlatButton has default props given by wrapper",() => {
          expect(btprops.labelStyle).to.deep.equal({ color: undefined, padding: 0, transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' });
          expect(btprops.disableFocusRipple).to.be.true;
          expect(btprops.disableTouchRipple).to.be.true;
        });
  });

  describe('StepsRaisedButton Style Wrapper Component :', () => {


    let button = shallow(<StepsRaisedButton/>);
    let btprops = button.node.props;
    let undefined;
      it("StepsRaisedButton has default props given by wrapper",() => {
        expect(btprops.label).to.deep.equal(undefined);
        expect(btprops.labelColor).to.deep.equal(textLight);
        expect(btprops.backgroundColor).to.equal(primary);
        expect(btprops.style).to.deep.equal({ marginTop: '.5em', marginBottom: '.5em', width: '25%' });
        expect(btprops.disableFocusRipple).to.be.true;
        expect(btprops.disableTouchRipple).to.be.true;
      });
      it('StepsRaisedButton will take a label or any props',()=>{
        let custombt = shallow(<StepsRaisedButton label={"Finished"} backgroundColor={"blue"}/>);
        let props = custombt.node.props;
        expect(props.label).to.be.equal("Finished");
        expect(props.backgroundColor).to.be.equal("blue");
      });
});

  /* --- StepsIconButton ---*/
  describe("StepsIconButton Style Wrapper Component", () =>{

    it("StepsIconButton uses correct default settings", () => {
      let icon = shallow(<StepsIconButton />);
      let props = icon.node.props;
      expect(props.disableTouchRipple).to.be.true;
      expect(props.disableFocusRipple).to.be.true;
    });

    it("StepsIconButton can take in props", () => {
      let icon = shallow(<StepsIconButton style={{color:"blue", width:"10em"}} tooltipPosition={'bottom-center'} touch={true}  />);
      let props = icon.node.props;
      expect(props.style).to.deep.equal({color:"blue", width:"10em"});
      expect(props.tooltipPosition).to.be.equal('bottom-center');
      expect(props.touch).to.be.true;
    })

  });

  /* --- StepsActionButton ---*/
  describe("StepsActionButton Style Wrapper Component", () =>{
    it("Uses the correct colors from material-style file as default", () => {
      let btn = shallow(<StepsActionButton />);
      expect(btn.node.props.backgroundColor).to.be.equal(primary);
      expect(btn.node.props.disabledColor).to.be.null;
      expect(btn.node.props.className).to.be.equal("");
      expect(btn.node.props.disabled).to.be.false;
      expect(btn.node.props.mini).to.be.false;
      expect(btn.node.props.onTouchTap).to.be.null;
      expect(btn.node.props.disableFocusRipple).to.be.true;
      expect(btn.node.props.disableTouchRipple).to.be.true;
    });

    it("StepsTextField will change as you pass new props in", () =>{
      let btn = shallow(<StepsActionButton mini={true} backgroundColor={secondary} className={"Hello"}/>);
      expect(btn.node.props.backgroundColor).to.be.equal(secondary);
      expect(btn.node.props.className).to.be.equal("Hello");
      expect(btn.node.props.mini).to.be.true;

    });
  });
// DROP DOWN MENUES
  /* --- StepsMenuItem ---*/
  describe("StepsMenuItem Style Wrapper Component", () =>{
      it("Uses the correct colors from material-style file as default",() => {
        let item = shallow(<StepsMenuItem />);
        let props = item.node.props;
        expect(props.style).to.deep.equal({ minHeight: '20px', lineHeight: '20px', padding: '10px 5px' });
        expect(props.disableFocusRipple).to.be.true;
        expect(props.disableTouchRipple).to.be.true;
        expect(props.checked).to.be.false;
      })
      it("Will Change props are passed in", () => {
        let item = shallow(<StepsMenuItem checked={true} value={2}  />);
        let props = item.node.props;
        expect(props.value).to.be.equal(2);
        expect(props.checked).to.be.true;
      })
  });

  /* --- StepsMenu ---*/
  describe("StepsMenu Style Wrapper Component", () =>{
    it("Uses the correct colors from material-style file as default", () => {
      let menu = shallow(<StepsMenu/>);
      let props = menu.node.props;

      expect(props.style).to.eql({ backgroundColor: background });
      expect(props.listStyle).to.eql({ paddingTop: '0px', paddingBottom: '0px' });
      expect(props.selectedMenuItemStyle).to.eql({color: active});
    })
    it("Will Change props are passed in", () => {
      let menu = shallow(<StepsMenu style={{backgroundColor: "blue"}} multiple={true} value={[1,2]} />);
      let props = menu.node.props;
      expect(props.style).to.deep.not.equal({ backgroundColor: background });
      expect(props.multiple).to.equal.true;
      expect(props.value).to.be.a('array');
    })

  });

  /* --- StepsSelectField ---*/
  describe("StepsSelectField Style Wrapper Component", () =>{
    it("Uses the correct colors from material-style file as default", () => {
      let field = shallow(<StepsSelectField/>);
      let props = field.node.props;

      expect(props.labelStyle).to.eql({color: textDark});
      expect(props.floatingLabelStyle).to.eql({ color: placeholderText, fontWeight: '500' });
      expect(props.iconStyle).to.eql({fill :placeholderText });
      expect(props.maxHeight).to.be.equal(200);
    })
    it("Will Change props are passed in", () => {
      let field = shallow(<StepsSelectField maxHeight={300} height={"90px"} />);
      let props = field.node.props;

      expect(props.maxHeight).to.be.not.equal(200);
      expect(props.maxHeight).to.be.equal(300);
      expect(props.height).to.be.equal("90px")
    })
  });
// TABS
  /* --- StepsTab ---*/
  describe("StepsTabs Style Wrapper Component", () =>{
    const tabsBorderRadius = '4px';
    it("Uses the correct colors from material-style file as default", () => {
      let tabs = shallow(<StepsTabs />);
      let props = tabs.node.props;

      expect(props.style).to.eql({backgroundColor: background, borderRadius: tabsBorderRadius })
      expect(props.inkBarStyle).to.eql({backgroundColor:"transparent"})
      expect(props.tabItemContainerStyle).to.eql({backgroundColor:"transparent"})
    });
    it("Will Change props are passed in", () => {
      let tabs = shallow(<StepsTabs style={{backgroundColor: primary, borderRadius: tabsBorderRadius }} inkBarStyle={{backgroundColor: "blue"}} tabItemContainerStyle={{backgroundColor: "blue"}}/>);
      let props = tabs.node.props;

      expect(props.style).to.not.eql({backgroundColor: background, borderRadius: tabsBorderRadius });
      expect(props.inkBarStyle).to.not.eql({backgroundColor:"transparent"});
      expect(props.tabItemContainerStyle).to.eql({backgroundColor:"blue"});
  });
});

const tabsBorderRadius = '4px';
const selectedTab = { color: textLight, background: tabs };
const inactiveTab = { color: textDark, background: background };
const roundBorder = tab => {
  if (tab === 'left')
    return { borderTopLeftRadius: tabsBorderRadius }
  else if (tab === 'right')
    return { borderTopRightRadius: tabsBorderRadius }
  else
    return {}
}
  /* --- StepsTabs ---*/
  describe("StepsTab Style Wrapper ", () =>{
    it("Uses the correct colors from material-style file as default", () => {
      let tab = shallow(<StepsTab/>);
      let props = tab.node.props;

      expect(props.style).to.eql(selectedTab);
      expect(props.disableTouchRipple).to.be.true;
      expect(props.disableFocusRipple).to.be.true;
      expect(props.height).to.be.undefined;
    })
    it("Will Change props are passed in", () => {
      let tab = shallow(<StepsTab style={{color: "blue"}} height={"100px"}/>);
      let props = tab.node.props;

      expect(props.style).to.eql({color : "blue"});
      expect(props.disableTouchRipple).to.be.true;
      expect(props.disableFocusRipple).to.be.true;
      expect(props.height).to.be.equal("100px");
    })
  });

});
