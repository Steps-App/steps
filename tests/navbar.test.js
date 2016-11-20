import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import NavbarMenu from '../app/components/navbar/NavbarMenu';
import NavbarTab from '../app/components/navbar/NavbarTab';
import { StepsFlatButton } from '../app/components/material-style';
import Popover from 'material-ui/Popover/Popover';

describe('NavbarMenu component', () => {

  let navbarMenu;
  beforeEach('Create component', () => {
    let user = { };
    let logout = () => {};
    navbarMenu = shallow(<NavbarMenu user={user} logout={logout}/>);
  });

  it('has 3 tabs and account popover', () => {
    expect(navbarMenu.find(NavbarTab).length).to.be.equal(3);
    expect(navbarMenu.find(Popover).length).to.be.equal(1);
  });

  it('has an initial state of {open: false}', () => {
    expect(navbarMenu.state()).to.be.deep.equal({ open: false });
  });
});


describe('NavbarTab component', () => {

  let navbarTab, label, img;
  beforeEach('Create component', () => {
    label = "Testing";
    img = "test-img";
    navbarTab = shallow(<NavbarTab label={label} imgClass={img} />)
  })

  it('passes its props to the children', () => {
    const button = navbarTab.find(StepsFlatButton).nodes[0];
    expect(button.props.label).to.equal(label);
    expect(navbarTab.find(`.${img}`).nodes).to.not.be.empty;
  });
});
