import * as React from 'react';
import { NavLink } from 'react-router-dom';

import classnames from 'classnames';

import {
  buildPath,
  DynamicRoutes,
  WordPressPages
} from '../../../model';

class ProjectMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      TechnicalDetails: false,
    };
  }

  toggleSubMenu(e, key) {
    //e.preventDefault();

    this.setState({
      [key]: !this.state[key],
    });
  }

  render() {
    return (
      <div className="about-item">

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.About])} onClick={(e) => this.toggleSubMenu(e, 'About')} style={{ 'cursor': 'pointer' }}>
          <h4 className="about-title">
            About
            <i
              style={{ 'float': 'right', 'fontSize': 'small' }}
              className={this.state['About'] ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}
            />
          </h4>
        </NavLink>

        <div
          className={
            classnames({
              'd-none': !this.state['About'],
            })
          }
          style={{ 'background': (this.state['About'] ? 'whitesmoke' : 'none') }}
        >
          <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.WhatIsHelix])}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              What is HELIX?
            </h4>
          </NavLink>

          <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Services])}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              Services
            </h4>
          </NavLink>

          <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              FAQ
            </h4>
          </NavLink>

          <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.PublishData])}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              Publish Data
            </h4>
          </NavLink>

          <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Software])}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              Software
            </h4>
          </NavLink>

          <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Project])}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              The project
            </h4>
          </NavLink>

          <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Media])}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              Media
            </h4>
          </NavLink>

          <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.AcknowledgeHelix])}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              Acknowledge Helix
            </h4>
          </NavLink>

          <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Contact])}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              Contact
            </h4>
          </NavLink>

          <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.TermsOfUse])}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              Terms of use
            </h4>
          </NavLink>

        </div>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Learn])}>
          <h4 className="about-title">
            Learn
          </h4>
        </NavLink>

        <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Use])}>
          <h4 className="about-title">
            Use
          </h4>
        </NavLink>

      </div >
    );
  }
}

export default ProjectMenu;
