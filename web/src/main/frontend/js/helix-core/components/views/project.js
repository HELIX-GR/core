import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { StaticRoutes, ErrorPages } from '../../model/routes';

import {
  Page403,
  Page404,
} from '../pages';

import {
  ProjectContact,
  ProjectDefault,
  ProjectFAQ,
  ProjectInfo,
  ProjectLearn,
  ProjectPublishData,
  ProjectSoftware,
  ProjectUse,
} from './project-children';

import AboutMenu from './about-menu';

class Project extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <section>
          <div className="landing-section header">
          </div>
        </section>

        <section className="landing-page-content">

          <div className="about-helix-container container-fluid">
            <div className="row">

              <div className="col-sm-12">
                <h4 className="about-header">
                  The project
                </h4>
              </div>

              <div className="col-md-3 col-xs-12">
                <AboutMenu />
              </div>

              <div className="col-md-9 col-xs-12">
                <div className="about-item">

                  <Switch>
                    {/* Handle errors first */}
                    <Route path={ErrorPages.Forbidden} component={Page403} exact />
                    <Route path={ErrorPages.NotFound} component={Page404} exact />
                    {/* Detail components */}
                    <Route path={StaticRoutes.PROJECT_CHILDREN.ABOUT_CHILDREN.PROJECT} component={ProjectInfo} />
                    <Route path={StaticRoutes.PROJECT_CHILDREN.ABOUT_CHILDREN.PUBLISH_DATA} component={ProjectPublishData} />
                    <Route path={StaticRoutes.PROJECT_CHILDREN.ABOUT_CHILDREN.SOFTWARE} component={ProjectSoftware} />
                    <Route path={StaticRoutes.PROJECT_CHILDREN.ABOUT} component={ProjectDefault} exact/>
                    <Route path={StaticRoutes.PROJECT_CHILDREN.CONTACT} component={ProjectContact} />
                    <Route path={StaticRoutes.PROJECT_CHILDREN.DEFAULT} component={ProjectDefault} exact />
                    <Route path={StaticRoutes.PROJECT_CHILDREN.FAQ} component={ProjectFAQ} />
                    <Route path={StaticRoutes.PROJECT_CHILDREN.LEARN} component={ProjectLearn} />
                    <Route path={StaticRoutes.PROJECT_CHILDREN.USE} component={ProjectUse} />
                  </Switch>

                </div>
              </div>

            </div>
          </div>

        </section>
      </div >

    );
  }
}

export default Project;
