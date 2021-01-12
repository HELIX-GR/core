import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import { injectIntl } from 'react-intl';

import {
  NavLink,
} from 'react-router-dom';

import {
  StaticRoutes,
} from '../../../../model';

import ClimateClock from '../../climate-clock';
import WordPressPage from '../word-press-page';

class AboutTemplate extends React.Component {

  render() {
    const { countdown, page } = this.props;

    const _t = this.props.intl.formatMessage;

    return (
      <main className="about page page--sidebar">
        <div className="container">
          <div className="page__wrapper">
            <div className="page__sidebar">
              <h2 className="page__title">{_t({ id: 'breadcrumb.about' })}</h2>
              <ul className="page__sidebar__menu">
                <li>
                  <NavLink to={StaticRoutes.Overview} activeClassName="active">
                    {_t({ id: 'sidebar.menu.about.items.overview' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.Targets} activeClassName="active">
                    {_t({ id: 'sidebar.menu.about.items.targets' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.Committee} activeClassName="active">
                    {_t({ id: 'sidebar.menu.about.items.committee' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.ScientificCommittee} activeClassName="active">
                    {_t({ id: 'sidebar.menu.about.items.scientific-committee' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.WorkPackages} activeClassName="active">
                    {_t({ id: 'sidebar.menu.about.items.work-packages' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.Deliverables} activeClassName="active">
                    {_t({ id: 'sidebar.menu.about.items.deliverables' })}
                  </NavLink>
                </li>
              </ul>
              {/* <ClimateClock countdown={countdown} minimal /> */}
            </div>
            <div id="page__content" className="page__content">
              <ul className="page__breadcrumbs">
                <li><a href="#">{_t({ id: 'breadcrumb.home' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.about' })}</a></li>
                <li><a href="#">{_t({ id: this.props.breadcrumb })}</a></li>
              </ul>
              <WordPressPage className="page__content__default" name={page} />
            </div>
          </div>
        </div>
      </main>
    );
  }

}

const mapStateToProps = (state) => ({
  countdown: state.countdown.value,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(AboutTemplate));
