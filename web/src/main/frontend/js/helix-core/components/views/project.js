import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  buildPath,
  DynamicRoutes,
  ErrorPages,
  getParams,
  WordPressPages,
} from '../../model';

import {
  Page403,
  Page404,
} from '../pages';

import {
  Menu,
  Page,
} from './project-parts';

class Project extends React.Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  render() {
    const match = getParams(this.props.location.pathname, {
      path: DynamicRoutes.PROJECT_PAGE,
      exact: true,
      strict: false,
    });

    const { name } = match ? match.params : WordPressPages.About;
    const _t = this.context.intl.formatMessage;

    return (
      <div>
        <section>
          <div className="landing-section header">
          </div>
        </section>

        <section className="project-landing-page-content">

          <div className="about-helix-container container-fluid">
            <div className="row">

              <div className="col-md-3 col-xs-12">
                <h4 className="about-header">
                  {_t({ id: 'project.title' })}
                </h4>
              </div>

              <div className="col-md-9 col-xs-12">
                <h4 className="about-header">
                  {_t({ id: `header.menu.project.items.${name}` })}
                </h4>
              </div>

              <div className="col-md-3 col-xs-12">
                <Menu />
              </div>

              <div className="col-md-9 col-xs-12">
                <div className="about-item">

                  <Switch>
                    {/* Handle errors first */}
                    <Route path={ErrorPages.Forbidden} component={Page403} exact />
                    <Route path={ErrorPages.NotFound} component={Page404} exact />
                    {/* Detail component */}
                    <Route path={DynamicRoutes.PROJECT_PAGE} component={Page} />
                    {/* Default */}
                    <Redirect to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.About])} />
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
