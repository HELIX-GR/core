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
import { Drawer } from '../../parts';

class Associate extends React.Component {

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
              <h2 className="page__title">{_t({ id: 'breadcrumb.network' })}</h2>
              <ul className="page__sidebar__menu">
                <li>
                  <NavLink to={StaticRoutes.Core} activeClassName="active">
                    {_t({ id: 'header.menu.network.items.core' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.Associate} activeClassName="active">
                    {_t({ id: 'header.menu.network.items.associate' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.Join} activeClassName="active">
                    {_t({ id: 'header.menu.network.items.join' })}
                  </NavLink>
                </li>
              </ul>
              <ClimateClock countdown={countdown} minimal />
            </div>
            <div className="page__content">
              <ul className="page__breadcrumbs">
                <li><a href="#">{_t({ id: 'breadcrumb.home' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.network' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.associate' })}</a></li>
              </ul>
              <div className="page__content__intro">
                <div className="page__content__intro__text">Short description of the association of these members. Το δίκτυο CLIMPACT επιδιώκει τη συνεργασία με την Εθνική Επιτροπή για την κλιματική αλλαγή, με την Επιτροπή Μελέτης Επιπτώσεων κλιματικής αλλαγής της Τράπεζας της Ελλάδος αλλά και με άλλες σχετικές πρωτοβουλίες και δράσεις ώστε να αποτελέσει πόλο έγκυρης και πολύπλευρης εμπειρογνωμοσύνης και συμβουλευτικό όργανο της Πολιτείας και της Κοινωνίας.</div>
              </div>
              <div className="page__content__default">
                <div className="drawer">
                  <Drawer type="logo" />
                  <Drawer type="logo" />
                  <Drawer type="logo" />
                  <Drawer type="logo" />
                </div>
              </div>
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

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Associate));
