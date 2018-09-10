import * as React from 'react';
import { NavLink } from 'react-router-dom';

import classnames from 'classnames';

import {
  buildPath,
  DynamicRoutes,
  WordPressPages
} from '../../../model';

class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      TechnicalDetails: false,
    };
  }

  toggleSubMenu(e, key) {
    this.setState({
      [key]: !this.state[key],
    });
  }

  render() {
    return (
      <div className="about-item">

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.WhatIsHelix])} activeClassName="selected">
          <h4 className="about-title" >
            What is HELIX?
            </h4>
        </NavLink>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Services])} activeClassName="selected">
          <h4 className="about-title" >
            Services
            </h4>
        </NavLink>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])} activeClassName="selected">
          <h4 className="about-title" >
            FAQ
            </h4>
        </NavLink>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.PublishData])} activeClassName="selected">
          <h4 className="about-title" >
            Publish Data
            </h4>
        </NavLink>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Software])} activeClassName="selected">
          <h4 className="about-title" >
            Software
            </h4>
        </NavLink>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Project])} activeClassName="selected">
          <h4 className="about-title" >
            The project
            </h4>
        </NavLink>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Media])} activeClassName="selected">
          <h4 className="about-title" >
            Media
            </h4>
        </NavLink>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.AcknowledgeHelix])} activeClassName="selected">
          <h4 className="about-title" >
            Acknowledge Helix
            </h4>
        </NavLink>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Contact])} activeClassName="selected">
          <h4 className="about-title" >
            Contact
            </h4>
        </NavLink>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.TermsOfUse])} activeClassName="selected">
          <h4 className="about-title" >
            Terms of use
            </h4>
        </NavLink>

      </div >
    );
  }
}

export default Menu;
