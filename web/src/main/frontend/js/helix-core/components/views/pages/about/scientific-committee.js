import $ from 'jquery';
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

import { ProfileModal } from '../../parts';

class ScientificCommittee extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      profile: null,
    };
  }

  showModal(profile) {
    this.setState({ open: true, profile });
  }

  closeModal() {
    this.setState({ open: false, profile: null });
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    $('#root').on('click', '.profile_cards__item', (e) => {
      e.preventDefault();

      const profile = $(e.currentTarget).data('page');

      this.showModal(profile);
    });
  }

  componentWillUnmount() {
    $('#root').off('click', '.profile_cards__item');
  }

  render() {
    const { open, profile } = this.state;
    const { countdown } = this.props;

    const _t = this.props.intl.formatMessage;

    return (
      <React.Fragment>
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
                <ClimateClock countdown={countdown} minimal />
              </div>
              <div className="page__content">
                <ul className="page__breadcrumbs">
                  <li><a href="#">{_t({ id: 'breadcrumb.home' })}</a></li>
                  <li><a href="#">{_t({ id: 'breadcrumb.about' })}</a></li>
                  <li><a href="#">{_t({ id: 'breadcrumb.scientific-committee' })}</a></li>
                </ul>
                <WordPressPage className="page__content__default" name={'about-scientific-committee'} />
              </div>
            </div>
          </div>
        </main>

        <ProfileModal open={open} closeModal={() => this.closeModal()} page={profile} />
      </React.Fragment>
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

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScientificCommittee));
