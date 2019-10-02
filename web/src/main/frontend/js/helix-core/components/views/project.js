import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { injectIntl } from 'react-intl';

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

  render() {
    const match = getParams(this.props.location.pathname, {
      path: DynamicRoutes.PROJECT_PAGE,
      exact: true,
      strict: false,
    });

    const { name = 'about'} = match ? match.params : WordPressPages.About;
    const _t = this.props.intl.formatMessage;
    const singleColumn = name === WordPressPages.Subjects;

    return (
      <div>
        <section>
          <div className="landing-section header">
          </div>
        </section>

        <section className="project-landing-page-content">

          <div className="about-helix-container container-fluid">
            <div className="row">

              {!singleColumn &&
                <div className="col-md-3 col-xs-12">
                  <h4 className="about-header">
                    {_t({ id: 'project.title' })}
                  </h4>
                </div>
              }

              {!singleColumn &&
                <div className={`col-md-${singleColumn ? 12 : 9} col-xs-12`}>
                  <h4 className="about-header">
                    {_t({ id: `header.menu.project.items.${name}` })}
                  </h4>
                </div>
              }

              {!singleColumn &&
                <div className="col-md-3 col-xs-12">
                  <Menu />
                </div>
              }

              <div className={`col-md-${singleColumn ? 12 : 9} col-xs-12`}>
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
      </div>

    );
  }
}

export default injectIntl(Project);
