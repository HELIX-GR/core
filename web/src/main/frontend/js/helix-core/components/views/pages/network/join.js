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

class Join extends React.Component {

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
                <li><a href="#">{_t({ id: 'breadcrumb.join' })}</a></li>
              </ul>
              <div className="page__content__default">
                <section>
                  <h2>CLIMPACT is a scientific network open to all organizations researching climate change. If you want to join the network, please contact us</h2>
                </section>
                <section className="no-padding">
                  <h1><a href="mailto:climpact@noa.gr" className="">climpact@noa.gr</a></h1>
                </section>
                <section>
                  <p>Το δίκτυο CLIMPACT επιδιώκει τη συνεργασία με την Εθνική Επιτροπή για την κλιματική αλλαγή, με την Επιτροπή Μελέτης Επιπτώσεων κλιματικής αλλαγής της Τράπεζας της Ελλάδος αλλά και με άλλες σχετικές πρωτοβουλίες και δράσεις ώστε να αποτελέσει πόλο έγκυρης και πολύπλευρης εμπειρογνωμοσύνης και συμβουλευτικό όργανο της Πολιτείας και της Κοινωνίας.</p>
                  <p>Το δίκτυο CLIMPACT επιδιώκει τη συνεργασία με την Εθνική Επιτροπή για την κλιματική αλλαγή, με την Επιτροπή Μελέτης Επιπτώσεων κλιματικής αλλαγής της Τράπεζας της Ελλάδος αλλά και με άλλες σχετικές πρωτοβουλίες και δράσεις ώστε να αποτελέσει πόλο έγκυρης και πολύπλευρης εμπειρογνωμοσύνης και συμβουλευτικό όργανο της Πολιτείας και της Κοινωνίας.</p>
                  <p>Το δίκτυο CLIMPACT επιδιώκει τη συνεργασία με την Εθνική Επιτροπή για την κλιματική αλλαγή, με την Επιτροπή Μελέτης Επιπτώσεων κλιματικής αλλαγής της Τράπεζας της Ελλάδος αλλά και με άλλες σχετικές πρωτοβουλίες και δράσεις ώστε να αποτελέσει πόλο έγκυρης και πολύπλευρης εμπειρογνωμοσύνης και συμβουλευτικό όργανο της Πολιτείας και της Κοινωνίας.</p>
                  <div className="page__content__default__download">
                    <div className="page__content__default__download__title">File to submit 1</div>
                    <div className="page__content__default__download__desc">
                      <p>Some additional info about the file.</p>
                      <p>Press the download button to get the .doc file</p>
                    </div>
                    <div className="page__content__default__download__button">
                      <a href="#" className="btn btn--simple">Download</a>
                    </div>
                  </div>
                  <div className="page__content__default__download page__content__default__download--nomargin-bottom">
                    <div className="page__content__default__download__title">File to submit 2</div>
                    <div className="page__content__default__download__desc">
                      <p>Some additional info about the file.</p>
                      <p>Press the download button to get the .doc file</p>
                    </div>
                    <div className="page__content__default__download__button">
                      <a href="#" className="btn btn--simple">Download</a>
                    </div>
                  </div>
                </section>
                <section className="no-padding">
                  <img src="/images/sample_images/angela-compagnone-g1xoeXbfuTw-unsplash.jpg" alt="" />
                </section>
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

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Join));
