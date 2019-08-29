import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { injectIntl } from 'react-intl';

import {
  buildPath,
  DynamicRoutes,
  WordPressPages,
} from '../../../model';

class About extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const _t = this.props.intl.formatMessage;

    return (
      <div className="about-helix-container container-fluid">
        <div className="row">

          <div className="col-sm-12">
            <h4 className="about-header">
              {_t({ id: 'main.about.title' })}
            </h4>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="about-item">
              <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>
                <h3 className="about-title">
                  {_t({ id: 'main.about.sections.1.title' })}
                </h3>
              </NavLink>

              <div className="about-text style-5">
                {_t({ id: 'main.about.sections.1.content' })}
              </div>

              <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>
                <div className="about-link">
                  {_t({ id: 'main.about.sections.1.link' })}
                </div>
              </NavLink>

            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="about-item">
              <a href="https://data.hellenicdataservice.gr" target="_blank">
                <h3 className="about-title">
                  {_t({ id: 'main.about.sections.2.title' })}
                </h3>
              </a>

              <div className="about-text style-5">
                {_t({ id: 'main.about.sections.2.content' })}
              </div>

              <a href="https://data.hellenicdataservice.gr" target="_blank">
                <div className="about-link">
                  {_t({ id: 'main.about.sections.2.link' })}
                </div>
              </a>

            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="about-item">
              <a href="https://lab.hellenicdataservice.gr" target="_blank">
                <h3 className="about-title">
                  {_t({ id: 'main.about.sections.3.title' })}
                </h3>
              </a>

              <div className="about-text style-5">
                {_t({ id: 'main.about.sections.3.content' })}
              </div>

              <a href="https://lab.hellenicdataservice.gr" target="_blank">
                <div className="about-link">
                  {_t({ id: 'main.about.sections.3.link' })}
                </div>
              </a>

            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="about-item">
              <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>
                <h3 className="about-title">
                  {_t({ id: 'main.about.sections.4.title' })}
                </h3>
              </NavLink>

              <div className="about-text style-5">
                {_t({ id: 'main.about.sections.4.content' })}
              </div>

              <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>
                <div className="about-link">
                  {_t({ id: 'main.about.sections.4.link' })}
                </div>
              </NavLink>

            </div>
          </div>

        </div>
      </div>
    );
  }

}

export default injectIntl(About);
