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
  ExternalRoutes,
  StaticRoutes,
} from '../../../../model';

import ClimateClock from '../../climate-clock';
import WordPressPage from '../word-press-page';

class Tools extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { countdown } = this.props;

    const _t = this.props.intl.formatMessage;

    return (
      <main className="about page page--sidebar">
        <div className="container">
          <div className="page__wrapper">
            <div className="page__sidebar">
              <h2 className="page__title">{_t({ id: 'breadcrumb.applications' })}</h2>
              <ul className="page__sidebar__menu">
                <li>
                  <NavLink to={StaticRoutes.Services} activeClassName="active">
                    {_t({ id: 'sidebar.menu.applications.items.services' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.Tools} activeClassName="active">
                    {_t({ id: 'sidebar.menu.applications.items.tools' })}
                  </NavLink>
                </li>
                <li>
                  <a href={ExternalRoutes.Lab} target="_blank">
                    {_t({ id: 'sidebar.menu.applications.items.lab' })}
                    {' '}
                    <img src="../images/icons/arrow-link.svg" alt="" />
                  </a>
                </li>
              </ul>
              <ClimateClock countdown={countdown} minimal />
            </div>
            <div className="page__content">
              <ul className="page__breadcrumbs">
                <li><a href="#">{_t({ id: 'breadcrumb.home' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.applications' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.tools' })}</a></li>
              </ul>
              <WordPressPage className="page__content__default" name={'applications-tools'} />
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

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Tools));
