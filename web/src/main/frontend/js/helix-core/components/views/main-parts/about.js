import * as React from 'react';
import { NavLink } from 'react-router-dom';

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
    return (
      <div className="about-helix-container container-fluid">
        <div className="row">

          <div className="col-sm-12">
            <h4 className="about-header">
              About Helix
            </h4>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="about-item">
              <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>
                <h3 className="about-title">
                  What is HELIX?
                </h3>
              </NavLink>

              <div className="about-text style-5">
                HELIX is an horizontal eInfrastructure for data-intensive research,
                handling the data management, analysis, sharing, and reuse needs of Greek scientists,
                researchers and innovators in a cross-disciplinary, scalable, and low-cost manner.
              </div>

              <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>
                <div className="about-link">
                  Learn more
                </div>
              </NavLink>

            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="about-item">
              <a href="https://data.hellenicdataservice.gr" target="_blank">
                <h3 className="about-title">
                  Search for Data
                </h3>
              </a>

              <div className="about-text style-5">
                Find, use, and share open scientific data created by Greek Research organizations,
                institutions, and innovators. Use them in your own research or line of work.
              </div>

              <a href="https://data.hellenicdataservice.gr" target="_blank">
                <div className="about-link">
                  Find data
                </div>
              </a>

            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="about-item">
              <a href="https://lab.hellenicdataservice.gr" target="_blank">
                <h3 className="about-title">
                  Build with data
                </h3>
              </a>

              <div className="about-text style-5">
                Learn, experiment, and work with data, without ever leaving in your browser.
                Tap into ready to use, highly scalable Big Data and HPC infrastructures.
              </div>

              <a href="https://lab.hellenicdataservice.gr" target="_blank">
                <div className="about-link">
                  Start coding
                </div>
              </a>

            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="about-item">
              <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>
                <h3 className="about-title">
                  Our partners
                </h3>
              </NavLink>

              <div className="about-text style-5">
                HELIX is a collective effort of Athena RC and GRNET S.A., with the financial support
                of the European Union, bringing together the entire Greek research community.
              </div>

              <NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>
                <div className="about-link">
                  Learn more
                </div>
              </NavLink>

            </div>
          </div>

        </div>
      </div>
    );
  }

}

export default About;
