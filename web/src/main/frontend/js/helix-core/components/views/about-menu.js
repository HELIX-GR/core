import * as React from 'react';
import { NavLink } from 'react-router-dom';

import classnames from 'classnames';

import { StaticRoutes } from '../../model/routes';

class AboutMenu extends React.Component {

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

        <NavLink to={StaticRoutes.PROJECT_CHILDREN.ABOUT} onClick={(e) => this.toggleSubMenu(e, 'About')} style={{ 'cursor': 'pointer' }}>
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
          <NavLink to={StaticRoutes.PROJECT_CHILDREN.ABOUT_CHILDREN.PUBLISH_DATA}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              Publish Data
            </h4>
          </NavLink>

          <NavLink to={StaticRoutes.PROJECT_CHILDREN.ABOUT_CHILDREN.PROJECT}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              The Project
            </h4>
          </NavLink>

          <NavLink to={StaticRoutes.PROJECT_CHILDREN.ABOUT_CHILDREN.SOFTWARE}>
            <h4 className="about-title" style={{ 'background': 'whitesmoke' }}>
              Software
            </h4>
          </NavLink>
        </div>

        <NavLink to={StaticRoutes.PROJECT_CHILDREN.CONTACT}>
          <h4 className="about-title">
            Contact
          </h4>
        </NavLink>

        <NavLink to={StaticRoutes.PROJECT_CHILDREN.FAQ}>
          <h4 className="about-title">
            FAQ
          </h4>
        </NavLink>

        <NavLink to={StaticRoutes.PROJECT_CHILDREN.LEARN}>
          <h4 className="about-title">
            Learn
          </h4>
        </NavLink>
        <NavLink to={StaticRoutes.PROJECT_CHILDREN.USE}>
          <h4 className="about-title">
            Use
          </h4>
        </NavLink>

      </div >
    );
  }
}

export default AboutMenu;
