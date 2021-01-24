import $ from 'jquery';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import { injectIntl } from 'react-intl';

import WordPressPage from '../word-press-page';

class Applications extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);

    $('#root').on('click', '.drawer__item', (e) => {
      const $el = $(e.currentTarget);

      if (!$el.hasClass('open')) {
        e.preventDefault();

        $el.addClass('open');
      }
    });

    $('#root').on('click', '.drawer__item__trigger', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const $el = $(e.currentTarget).closest('.drawer__item');

      $el.toggleClass('open');
    });
  }

  componentWillUnmount() {
    $('#root').off('click', '.drawer__item');

    $('#root').off('click', '.drawer__item__trigger');
  }

  render() {
    const _t = this.props.intl.formatMessage;

    return (
      <main className="about page page--sidebar">
        <div className="container">
          <div className="page__wrapper">
            <div className="page__content">
              <ul className="page__breadcrumbs">
                <li><a href="#">{_t({ id: 'breadcrumb.home' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.applications' })}</a></li>
              </ul>
              <div className="page__content__default">
                <WordPressPage className="drawer" name={'applications-menu'} />
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

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Applications));
