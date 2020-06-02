import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { injectIntl } from 'react-intl';

import {
  buildPath,
  DynamicRoutes,
  ErrorPages,
  getParams,
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

  render() {
    const { path, name, prefix, pages } = this.props;

    const _t = this.props.intl.formatMessage;
    const singleColumn = false;

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
                    {_t({ id: `${prefix}.title` })}
                  </h4>
                </div>
              }

              {!singleColumn &&
                <div className={`col-md-${singleColumn ? 12 : 9} col-xs-12`}>
                  <h4 className="about-header">
                    {_t({ id: `${prefix}.items.${name}` })}
                  </h4>
                </div>
              }

              {!singleColumn &&
                <div className="col-md-3 col-xs-12">
                  <Menu path={path} prefix={prefix} pages={pages} />
                </div>
              }

              <div className={`col-md-${singleColumn ? 12 : 9} col-xs-12`}>
                <div className="about-item">

                  <Switch>
                    {/* Handle errors first */}
                    <Route path={ErrorPages.Forbidden} component={Page403} exact />
                    <Route path={ErrorPages.NotFound} component={Page404} exact />
                    {/* Detail component */}
                    <Route path={path} component={Page} />
                    {/* Default */}
                    <Redirect to={buildPath(path, [name])} />
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
