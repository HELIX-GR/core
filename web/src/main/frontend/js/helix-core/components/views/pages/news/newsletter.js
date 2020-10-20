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

class Newsletter extends React.Component {

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
              <h2 className="page__title">{_t({ id: 'breadcrumb.news' })}</h2>
              <ul className="page__sidebar__menu">
                <li>
                  <NavLink to={StaticRoutes.Workshops} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.workshops' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.OtherEvents} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.other-events' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.Newsletter} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.newsletter' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.Blog} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.blog' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.DialogueForum} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.dialogue-forum' })}
                  </NavLink>
                </li>
              </ul>
              <ClimateClock countdown={countdown} minimal />
            </div>
            <div className="page__content">
              <ul className="page__breadcrumbs">
                <li><a href="#">{_t({ id: 'breadcrumb.home' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.news' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.newsletter' })}</a></li>
              </ul>

              <section className="cards cards--sidebar">
                <div className="cards__inner">
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>
                  <a href="#" className="cards__item cards__item--newsletter">
                    <div className="cards__item__top" style={{ backgroundImage: 'url(/images/dummy_card.png)' }}></div>
                    <h3 className="cards__item__title">Newsletter #1</h3>
                    <span className="cards__item__button">Εγγραφη</span>
                  </a>

                  <div className="cards__item cards__item--empty"></div>
                </div>
              </section>

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

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Newsletter));
